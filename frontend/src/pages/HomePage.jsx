import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
};

const MapPage = () => {
  const [mode, setMode] = useState("user");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    try{
           e.preventDefault();
    console.log(password);
    
    const res=await axios.post("http://localhost:3000/api/ambulance/login", { password })
    console.log(res.data);
    if(res.status==200){
      alert("Login successful");
      console.log("Emergency mode activated");
      
    }

    }
 
    catch(err){
        
  if (err.response?.status === 401) {
    alert("Invalid password");
  }

    }
  

    
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {/* Top Control Panel */}
      <div style={styles.controlPanel}>
        <label><b>Select Mode:</b></label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={styles.select}
        >
          <option value="user">User</option>
          <option value="ambulance">Ambulance</option>
        </select>

        {/* Ambulance Login */}
        {mode === "ambulance" && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="password"
              placeholder="Enter ambulance password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>

            <p style={styles.registerText}>
              New ambulance?
              <a href="/register" style={styles.link}> Register here</a>
            </p>
          </form>
        )}
      </div>

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

const styles = {
  controlPanel: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 100,
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    width: "260px",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
  },
  form: {
    marginTop: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "8px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  registerText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    marginLeft: "5px",
  },
};


export default MapPage;
