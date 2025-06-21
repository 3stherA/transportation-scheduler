import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RideRequestCard from './RideRequestCard';
import DriverCard from './DriverCard';
import AssignmentModal from './AssignmentModal';

const Dashboard = ({ authenticatedOrgName, onBackToMain, onSignOut }) => {
  const [rideRequests, setRideRequests] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignedDrivers, setAssignedDrivers] = useState([]);
  const [unassignedRequests, setUnassignedRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Date utility functions
  const dateUtils = {
    getCurrentDate: () => new Date().toISOString().split('T')[0],
    
    // Convert YYYY-MM-DD to timezone-safe Date object
    parseDate: (dateString) => new Date(dateString + 'T00:00:00'),
    
    // Convert YYYY-MM-DD to M/D/YYYY for API
    formatForAPI: (dateString) => {
      if (!dateString) return '';
      const date = dateUtils.parseDate(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    
    // Convert YYYY-MM-DD to display format
    formatForDisplay: (dateString) => {
      if (!dateString) return '';
      return dateUtils.parseDate(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  // Generate date options for dropdown
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      });
      
      options.push({
        value: dateString,
        label: i === 0 ? `Today (${displayDate})` : displayDate
      });
    }
    
    return options;
  };

  // Fetch data from API
  const fetchData = async (date = selectedDate) => {
    if (!date) return;
    
    setLoading(true);
    const apiDate = dateUtils.formatForAPI(date);
    
    console.log(`Fetching data for ${date} (API format: ${apiDate})`);
    
    try {
      const [rideRes, driverRes] = await Promise.all([
        axios.get(`https://transportation-scheduler-backend-production.up.railway.app//ride-requests?date=${encodeURIComponent(apiDate)}`),
        axios.get(`https://transportation-scheduler-backend-production.up.railway.app//driver-registrations?date=${encodeURIComponent(apiDate)}`),
      ]);

      console.log(`Found ${rideRes.data.length} ride requests, ${driverRes.data.length} drivers`);
      
      setRideRequests(rideRes.data);
      setDrivers(driverRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRideRequests([]);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle assignment creation
  const handleAssignment = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    const apiDate = dateUtils.formatForAPI(selectedDate);
    
    console.log(`Creating assignments for ${selectedDate} (API format: ${apiDate})`);
    
    try {
      const response = await axios.get(`https://transportation-scheduler-backend-production.up.railway.app//assignments?date=${encodeURIComponent(apiDate)}`);
      const { assignedDrivers = [], unassignedRequests = [] } = response.data;
      
      console.log(`Found ${assignedDrivers.length} assigned drivers, ${unassignedRequests.length} unassigned requests`);
      
      setAssignedDrivers(assignedDrivers);
      setUnassignedRequests(unassignedRequests);
    } catch (error) {
      console.error("Assignment error:", error);
      setAssignedDrivers([]);
      setUnassignedRequests([]);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  // Initialize with current date
  useEffect(() => {
    setSelectedDate(dateUtils.getCurrentDate());
  }, []);

  // Fetch data when date changes
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  // Event handlers
  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleRefresh = () => fetchData(selectedDate);
  const closeModal = () => setIsModalOpen(false);

  // Render data section
  const renderDataSection = (title, data, CardComponent, loadingText, emptyText) => (
    <div className="dashboard-card">
      <h2 className="card-title">
        {title} - {dateUtils.formatForDisplay(selectedDate)}
      </h2>
      <div className="card-content">
        {loading ? (
          <p>{loadingText}</p>
        ) : data.length === 0 ? (
          <p>{emptyText}</p>
        ) : (
          <div>
            <p className="data-summary">
              Found {data.length} {title.toLowerCase()}{data.length !== 1 ? 's' : ''}
            </p>
            {data.map((item, index) => (
              <CardComponent key={index} {...{[title === 'Ride Requests' ? 'request' : 'driver']: item}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const dateOptions = generateDateOptions();

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard - {authenticatedOrgName}</h1>
          
          <div className="date-selection">
            <label htmlFor="date-select" className="date-label">Select Date:</label>
            <select 
              id="date-select"
              value={selectedDate} 
              onChange={handleDateChange}
              className="date-dropdown"
            >
              {dateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="dashboard-actions">
            <button onClick={onBackToMain} className="btn btn-primary">Back to Main</button>
            <button onClick={onSignOut} className="btn btn-danger">Sign Out</button>
            <button onClick={handleRefresh} className="btn btn-secondary">Refresh</button>
            <button onClick={handleAssignment} className="btn btn-tertiary">Assign</button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="dashboard-grid">
          {renderDataSection(
            'Ride Requests', 
            rideRequests, 
            RideRequestCard, 
            'Loading ride requests...', 
            'No ride requests found for this date.'
          )}
          
          {renderDataSection(
            'Drivers', 
            drivers, 
            DriverCard, 
            'Loading drivers...', 
            'No drivers registered for this date.'
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {isModalOpen && (
        <AssignmentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          assignedDrivers={assignedDrivers}
          unassignedRequests={unassignedRequests}
          isLoading={loading}
          selectedOrg={authenticatedOrgName}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Dashboard;