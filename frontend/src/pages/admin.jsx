import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Accept user
  const handleAccept = async (id) => {
    console.log(id);
    
    try {
      const res=await axios.put(`http://localhost:3000/users/accept/${id}`);
      if(res.status==200){
       setStatus("Accepted") 
      }
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Reject user
  const handleReject = async (id) => {
    try {
      const res=await axios.delete(`http://localhost:3000/users/reject/${id}`);
      if(res.status==200){
       setStatus("Rejected")
      }
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
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
          margin-right: 8px;
        }
        .rej-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
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
        <p>Incoming Ambulance Priority Requests</p>

        <table>
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Vehicle No</th>
              <th>Status / Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No pending requests
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.vehicleNo}</td>
                  <td>
  {status === "Accepted" ? (
    <span className="status accepted">Approved</span>
  ) : status === "Rejected" ? (
    <span className="status rejected">Rejected</span>
  ) : (
    <>
      <button
        className="acc-btn"
        onClick={() => handleAccept(user.email)}
      >
        Accept
      </button>
      <button
        className="rej-btn"
        onClick={() => handleReject(user.email)}
      >
        Reject
      </button>
    </>
  )}
</td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
