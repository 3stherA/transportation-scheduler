import React from 'react';

const RideRequestCard = ({ request }) => {
    console.log("Rendering RideRequestCard with data:", request);

    const name = request["Your name"] || "Unknown";
    const address = request["Home Address"] || "N/A";
    const passengers = request["Passengers"] || "0";
    const phone = request["Phone number"] || "N/A";
    const date = request["Date in Question"] || "N/A";
    const submissionDate = request["Timestamp"];

  return (
    <div className="request-item">
      <div className="request-header">
        <h3 className="request-name">{name}</h3>
        <span className="submission-badge">{submissionDate}</span>
      </div>
      <p className="request-detail">Passengers: {passengers}</p>
      <p className="request-detail">Address: {address}</p>
      <p className="request-detail">Phone: {phone}</p>
    </div>
  );
};

export default RideRequestCard;