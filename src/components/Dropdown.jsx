import React from 'react';
import { ORGANIZATIONS } from '../constants';

const Dropdown = ({ selectedOrg, onOrgChange }) => {
  return (
    <div className="org-section">
      <label className="org-label">Select Organization</label>
      <select
        value={selectedOrg}
        onChange={(e) => onOrgChange(e.target.value)}
        className="org-dropdown"
      >
        <option value="">Choose an organization...</option>
        {ORGANIZATIONS.map((org, index) => (
          <option key={index} value={org}>
            {org}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;