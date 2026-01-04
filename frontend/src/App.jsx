import { useState } from 'react'
import Register from   './pages/Register.jsx'
//import Admin from './pages/Admin.jsx'
//import AmbulanceDriver from './pages/ambulances.jsx';
import AdminDashboard from './pages/admin.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return(
 <>
 <Router>
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/admin" element={<AdminDashboard />} />
  </Routes>
 </Router>
 

 
 </>
)
}

export default App
