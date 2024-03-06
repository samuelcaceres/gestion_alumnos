import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AlumnoList from "./components/AlumnoList";
import AddAlumno from "./components/AddAlumno";
import EditAlumno from "./components/EditAlumno";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<AlumnoList />} />
          <Route path="/add" element={<AddAlumno />} />
          <Route path="/edit/:id" element={<EditAlumno />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
