import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AdminModal from './components/AdminModal';
import FormModal from './components/FormModal';
import DriverModal from './components/DriverModal';
import AssignmentModal from './components/AssignmentModal';
import Dropdown from './components/Dropdown';
import { ActionButtons, AdminButtons } from './components/Buttons';
import { createButtonActions } from './actions/buttonActions';
import './styles/App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'driver' or 'passenger'
  const [selectedOrg, setSelectedOrg] = useState('');
  
  // Admin states
  const [isAdminSignedIn, setIsAdminSignedIn] = useState(false);
  const [authenticatedOrgName, setAuthenticatedOrgName] = useState('');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Driver states
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [driverAccessCode, setDriverAccessCode] = useState('');
  const [driverVerified, setDriverVerified] = useState(false);
  const [driverError, setDriverError] = useState('');

  // Assignment states
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [assignmentError, setAssignmentError] = useState('');

  // Login form states
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create button actions with setters
  const buttonActions = createButtonActions({
    setModalType,
    setIsModalOpen,
    setShowAdminModal,
    setOrgName,
    setPassword,
    setLoginError,
    setIsLoading,
    setIsAdminSignedIn,
    setAuthenticatedOrgName,
    setShowAdminDashboard,
    setShowDriverModal,
    setDriverAccessCode,
    setDriverError,
    setDriverVerified,
    setShowAssignmentModal,
    setAssignments,
    setAssignmentError,
  });

  const {
    openModal,
    closeModal,
    closeDriverModal,
    handleDriverVerification,
    openAssignmentModal,
    closeAssignmentModal,
    handleAdminSignInClick,
    closeAdminModal,
    handleLogin,
    handleAdminSignOut,
    handleBackToMain,
  } = buttonActions;

  if (showAdminDashboard) {
    return (
      <Dashboard
        authenticatedOrgName={authenticatedOrgName}
        onBackToMain={handleBackToMain}
        onSignOut={handleAdminSignOut}
      />
    );
  }

  return (
    <div className="app-container">
      <AdminButtons
        isAdminSignedIn={isAdminSignedIn}
        authenticatedOrgName={authenticatedOrgName}
        onSignInClick={handleAdminSignInClick}
        onDashboardClick={() => setShowAdminDashboard(true)}
        onSignOut={handleAdminSignOut}
      />

      <div className="main-content">
        <div className="main-section">
          <h1 className="main-title">Transportation Scheduler</h1>
          <p className="main-subtitle">Request rides or register as a driver</p>

          <Dropdown
            selectedOrg={selectedOrg}
            onOrgChange={setSelectedOrg}
          />

          <ActionButtons
            selectedOrg={selectedOrg}
            onOpenModal={(type) => openModal(type, selectedOrg)}
            onOpenAssignments={() => openAssignmentModal(selectedOrg)}
          />

          {selectedOrg && (
            <div className="selected-org">
              <p>
                <strong>Selected:</strong> {selectedOrg}
              </p>
            </div>
          )}
        </div>

        <AdminModal
          isOpen={showAdminModal}
          onClose={closeAdminModal}
          onLogin={() => handleLogin(orgName, password)}
          orgName={orgName}
          setOrgName={setOrgName}
          password={password}
          setPassword={setPassword}
          loginError={loginError}
          isLoading={isLoading}
        />

        <DriverModal
          isOpen={showDriverModal}
          onClose={closeDriverModal}
          onVerify={() => handleDriverVerification(driverAccessCode)}
          accessCode={driverAccessCode}
          setAccessCode={setDriverAccessCode}
          error={driverError}
          isLoading={isLoading}
          selectedOrg={selectedOrg}
        />

        <AssignmentModal
          isOpen={showAssignmentModal}
          onClose={closeAssignmentModal}
          assignments={assignments}
          error={assignmentError}
          isLoading={isLoading}
          selectedOrg={selectedOrg}
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          modalType={modalType}
          selectedOrg={selectedOrg}
        />
      </div>
    </div>
  );
}

export default App;