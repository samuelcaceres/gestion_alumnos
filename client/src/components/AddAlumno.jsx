import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAlumno = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carrera, setCarrera] = useState("Sin seleccionar");
  const navigate = useNavigate();

  const saveAlumno = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/alumnos", {
        name,
        email,
        carrera,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error saving alumno:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="box has-background-primary has-text-white rounded-lg p-4">
            <form onSubmit={saveAlumno}>
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
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlumno;
