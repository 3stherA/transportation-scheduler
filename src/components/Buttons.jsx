import React from 'react';

export const ActionButtons = ({ selectedOrg, onOpenModal }) => {
  return (
    <div className="action-buttons">
      <button
        onClick={() => onOpenModal('passenger')}
        disabled={!selectedOrg}
        className={`btn btn-large btn-passenger ${
          !selectedOrg ? 'btn-disabled' : ''
        }`}
      >
        Request a Ride
      </button>

      <button
        onClick={() => onOpenModal('driver')}
        disabled={!selectedOrg}
        className={`btn btn-large btn-driver ${
          !selectedOrg ? 'btn-disabled' : ''
        }`}
      >
        Register as Driver
      </button>
    </div>
  );
};

export const AdminButtons = ({
  isAdminSignedIn,
  authenticatedOrgName,
  onSignInClick,
  onDashboardClick,
  onSignOut,
}) => {
  return (
    <div className="admin-corner">
      {!isAdminSignedIn ? (
        <button onClick={onSignInClick} className="btn btn-admin">
          Admin Sign In
        </button>
      ) : (
        <div className="admin-buttons">
          <button onClick={onDashboardClick} className="btn btn-success">
            Dashboard ({authenticatedOrgName})
          </button>
          <button onClick={onSignOut} className="btn btn-danger">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};