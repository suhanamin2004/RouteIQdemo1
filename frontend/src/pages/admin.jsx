import React, { useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([
    {
      name: "Ramesh Kumar",
      veh: "KA-01-2345",
      email: "ramesh@gmail.com",
      status: "Pending",
    },
    {
      name: "Suresh Naik",
      veh: "KA-02-9876",
      email: "suresh@gmail.com",
      status: "Pending",
    },
  ]);

  const updateStatus = (index, status) => {
    const updated = [...requests];
    updated[index].status = status;
    setRequests(updated);
    alert(`Request ${status} (Frontend Demo Only)`);
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #f0f2f5;
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
        .admin-container {
          max-width: 900px;
          margin: 40px auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        h2 {
          color: #1a73e8;
          margin-top: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background: #1a73e8;
          color: white;
        }
        .acc-btn {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-right: 8px;
        }
        .rej-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .status {
          font-weight: bold;
        }
        .accepted {
          color: #2ecc71;
        }
        .rejected {
          color: #e74c3c;
        }
      `}</style>

      <nav>
        <a href="#">🗺️ Map View</a>
        <a href="#">🚑 Driver Portal</a>
        <a href="#">👮 Admin Portal</a>
      </nav>

      <div className="admin-container">
        <h2>👮 Admin Dashboard</h2>
        <p>Incoming Ambulance Priority Requests (Frontend Demo)</p>

        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Vehicle #</th>
              <th>Email</th>
              <th>Status / Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.name}</td>
                <td>{req.veh}</td>
                <td>{req.email}</td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="acc-btn"
                        onClick={() => updateStatus(index, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="rej-btn"
                        onClick={() => updateStatus(index, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`status ${
                        req.status === "Accepted"
                          ? "accepted"
                          : "rejected"
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
