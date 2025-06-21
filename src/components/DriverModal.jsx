import React from 'react';

const DriverModal = ({ 
  isOpen, 
  onClose, 
  onVerify, 
  accessCode, 
  setAccessCode, 
  error, 
  isLoading, 
  selectedOrg 
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessCode.trim()) {
      onVerify();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && accessCode.trim() && !isLoading) {
      onVerify();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Driver Verification</h2>
          <button onClick={onClose} className="modal-close" disabled={isLoading}>
            ✖
          </button>
        </div>

        <div className="modal-org-info">
          <p><strong>Organization:</strong> {selectedOrg}</p>
        </div>

        <div className="modal-body">
          <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '16px', color: '#555' }}>
            Please enter your Driver ID to proceed with registration.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="accessCode">
              Driver Access Code:
            </label>
            <input
              type="text"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your Driver ID"
              disabled={isLoading}
              required
            />

            {error && (
              <div className="error-text">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-admin"
              disabled={!accessCode.trim() || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;