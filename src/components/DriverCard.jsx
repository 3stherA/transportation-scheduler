import React from 'react';

const DriverCard = ({ driver }) => {
  const name = driver["Name"] || "Unknown";
  const seats = driver["How many Seats"] || "0";
  const date = driver["Date in Question"] || "N/A";
  const submissionDate = driver["Timestamp"];

  const phone = driver.phone || "N/A";
  const address = driver.address || "N/A";
  const vehicle = driver.vehicle || "N/A";

  return (
    <div className="driver-item">
      <div className="driver-header">
        <h3 className="driver-name">{name}</h3>
        <span className="submission-badge">{submissionDate}</span>
      </div>
      <p className="request-detail">Seats: {seats}</p>
      <p className="request-detail">Address: {address}</p>
      <p className="request-detail">Phone: {phone}</p>
    </div>
  );
};

export default DriverCard;