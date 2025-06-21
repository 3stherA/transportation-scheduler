import React from 'react';
import { FORM_URLS } from '../constants';

const FormModal = ({ isOpen, onClose, modalType, selectedOrg }) => {
  if (!isOpen) return null;

  const title = modalType === 'driver' ? 'Driver Registration' : 'Ride Request';
  const formURL = FORM_URLS[modalType];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button onClick={onClose} className="modal-close">
            ✖
          </button>
        </div>

        <div className="modal-org-info">
          <p><strong>Organization:</strong> {selectedOrg}</p>
        </div>

        <iframe
          src={formURL}
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title={`${modalType} Form`}
          className="modal-iframe"
        >
          Loading form...
        </iframe>
      </div>
    </div>
  );
};

export default FormModal;