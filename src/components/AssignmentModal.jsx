import React from 'react';

const AssignmentModal = ({ 
    isOpen, 
    onClose, 
    assignedDrivers, 
    unassignedRequests, 
    isLoading, 
    selectedOrg,
    selectedDate 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Driver Assignments</h2>
          <button onClick={onClose} className="modal-close">
            ✖
          </button>
        </div>

        <div className="modal-org-info">
          <p><strong>Organization:</strong> {selectedOrg}</p>
          {selectedDate && (
            <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          )}
        </div>

        <div className="modal-body">
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#555' }}>
              Loading assignments...
            </div>
          )}

          {!isLoading && (
            <>
              {/* Assigned Drivers Section */}
              <div className="assigned-section">
                <h3>Assigned Drivers</h3>
                {assignedDrivers && assignedDrivers.length > 0 ? (
                  <div className="assignments-container">
                    {assignedDrivers.map((driver, index) => (
                      <div key={driver.id || index} className="driver-assignment">
                        <div className="driver-info">
                          <strong>{driver.name}</strong> ({driver.phone})
                          <br />
                          <span>Vehicle: {driver.vehicle}</span>
                          <br />
                          <span>Address: {driver.address}</span>
                          <br />
                          <span>Seats Available: {driver.remaining_seats}/{driver.seats}</span>
                        </div>
                        <div className="assigned-riders">
                          <h4>Assigned Passengers:</h4>
                          {driver.assigned_riders && driver.assigned_riders.length > 0 ? (
                            driver.assigned_riders.map((rider, riderIndex) => (
                              <div key={riderIndex} className="rider-info">
                                <strong>{rider["Your name"]}</strong> ({rider["Phone number"]})
                                <br />
                                <span>Passengers: {rider.Passengers}</span>
                                <br />
                                <span>Address: {rider["Home Address"]}</span>
                              </div>
                            ))
                          ) : (
                            <p className="no-passengers">No passengers assigned</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No assigned drivers found.</p>
                )}
              </div>

              {/* Unassigned Requests Section - Enhanced with red styling */}
              <div className="unassigned-section">
                <h3>
                  ⚠️ Unassigned Requests
                </h3>
                {unassignedRequests && unassignedRequests.length > 0 ? (
                  <div className="unassigned-container alert">
                    {unassignedRequests.map((request, index) => (
                      <div key={index} className="unassigned-request alert">
                        <strong>{request["Your name"]}</strong> ({request["Phone number"]})
                        <br />
                        <span>Passengers: {request.Passengers}</span>
                        <br />
                        <span>Address: {request["Home Address"]}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-unassigned-success">
                    ✅ All requests have been assigned! No unassigned requests.
                  </div>
                )}
              </div>

              {/* Show message if no data at all */}
              {(!assignedDrivers || assignedDrivers.length === 0) && 
               (!unassignedRequests || unassignedRequests.length === 0) && (
                <div style={{ textAlign: 'center', padding: '20px', fontSize: '16px', color: '#555' }}>
                  No assignments found for this organization.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;