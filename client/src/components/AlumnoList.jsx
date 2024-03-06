import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AlumnoList = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getAlumnos();
  }, []);

  const getAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/alumnos");
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error fetching alumnos:", error);
    }
  };

  const deleteAlumno = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/alumnos/${id}`);
      getAlumnos();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error deleting alumno:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-half">
          <Link to="/add" className="button is-primary mb-3">
            Agregar Nuevo
          </Link>
          <h2 className="title is-4 mb-4">Alumnos inscriptos.</h2>
          {showAlert && (
            <div className="notification is-success mb-3">
              Alumno eliminado exitosamente.
            </div>
          )}
          {alumnos.map((alumno, index) => (
            <div key={alumno._id} className={`notification is-${index % 2 === 0 ? 'info' : 'success'} mb-3`}>
              <p><strong>No:</strong> {index + 1}</p>
              <p><strong>Nombre:</strong> {alumno.name}</p> 
              <p><strong>Correo:</strong> {alumno.email}</p> 
              <p><strong>Carrera:</strong> {alumno.carrera}</p> 
              <div className="buttons mt-2">
                <Link
                  to={`/edit/${alumno._id}`}
                  className="button is-link is-small"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteAlumno(alumno._id)}
                  className="button is-danger is-small ml-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumnoList;
