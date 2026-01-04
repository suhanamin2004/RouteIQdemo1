import React, { useState } from "react";

const AmbulanceDriver = () => {
  const [driverName, setDriverName] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendRequest = () => {
    if (!driverName || !vehicleNum || !driverEmail) {
      alert("Please fill all fields!");
      return;
    }

    setMessage("✅ Request submitted successfully (Frontend Demo Only)");

    // Clear fields
    setDriverName("");
    setVehicleNum("");
    setDriverEmail("");
  };

  const clearForm = () => {
    setDriverName("");
    setVehicleNum("");
    setDriverEmail("");
    setMessage("");
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #f4f7f6;
          margin: 0;
        }
        nav {
          background: #333;
          padding: 15px;
          text-align: center;
        }
        nav a {
          color: white;
          margin: 0 20px;
          text-decoration: none;
          font-weight: bold;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 60px);
        }
        .form-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          width: 350px;
        }
        h2 {
          color: #d63031;
          margin-top: 0;
        }
        label {
          display: block;
          margin-top: 15px;
          font-size: 13px;
          color: #666;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .btn-group {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }
        button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .req-btn {
          background: #d63031;
          color: white;
        }
        .req-btn:hover {
          background: #b02323;
        }
        .can-btn {
          background: #eee;
          color: #333;
        }
        #msg {
          color: #27ae60;
          font-size: 13px;
          margin-top: 15px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>

      <nav>
        <a href="#">🗺️ Map View</a>
        <a href="#">🚑 Driver Portal</a>
        <a href="#">👮 Admin Portal</a>
      </nav>

      <div className="container">
        <div className="form-card">
          <h2>🚑 Driver Portal</h2>
          <p style={{ fontSize: "13px", color: "#777" }}>
            Request emergency route priority access.
          </p>

          <label>DRIVER NAME</label>
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            placeholder="Enter Full Name"
          />

          <label>VEHICLE NUMBER</label>
          <input
            type="text"
            value={vehicleNum}
            onChange={(e) => setVehicleNum(e.target.value)}
            placeholder="e.g. KA-01-1234"
          />

          <label>DRIVER EMAIL</label>
          <input
            type="email"
            value={driverEmail}
            onChange={(e) => setDriverEmail(e.target.value)}
            placeholder="driver@gmail.com"
          />

          <div className="btn-group">
            <button className="req-btn" onClick={sendRequest}>
              Send Request
            </button>
            <button className="can-btn" onClick={clearForm}>
              Clear
            </button>
          </div>

          {message && <p id="msg">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AmbulanceDriver;
