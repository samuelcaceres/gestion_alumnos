import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditAlumno = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carrera, setCarrera] = useState("Sin seleccionar");
  const [showAlert, setShowAlert] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAlumnoById();
  }, []);

  const getAlumnoById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/alumnos/${id}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setCarrera(response.data.carrera);
    } catch (error) {
      console.error("Error fetching alumno:", error);
    }
  };

  const updateAlumno = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/alumnos/${id}`, {
        name,
        email,
        carrera,
      });
      navigate("/home");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
    } catch (error) {
      console.error("Error updating alumno:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box has-background-primary has-text-white rounded-lg p-4">
            <form onSubmit={updateAlumno}>
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Correo Electrónico</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo Electrónico"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Carrera</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={carrera}
                      onChange={(e) => setCarrera(e.target.value)}
                    >
                      <option value="Sin seleccionar">Sin seleccionar</option>
                      <option value="Ingenieria">Ingenieria</option>
                      <option value="Contabilidad">Contabilidad</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
            {showAlert && (
              <div className="notification is-success">
                El alumno ha sido actualizado correctamente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAlumno;
