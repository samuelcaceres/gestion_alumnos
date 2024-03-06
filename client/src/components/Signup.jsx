import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup (){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', { name, email, password });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="columns is-centered is-vcentered is-fullheight" style={{ background: 'linear-gradient(to right, #4A77F7, #90A8F7)', margin: 0, height: '100vh' }}>
            <div className="column is-one-quarter">
                <div className="box" style={{ backgroundColor: 'white', padding: '2rem' }}>
                    <h2 className="title is-4 has-text-centered">Registrate.</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label"><strong>Nombre</strong></label>
                            <div className="control">
                                <input 
                                    type="text"
                                    className="input"
                                    placeholder="Ingresa el nombre" 
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label"><strong>Correo</strong></label>
                            <div className="control">
                                <input 
                                    type="text"
                                    className="input"
                                    placeholder="Ingresa el correo" 
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label"><strong>Contraseña</strong></label>
                            <div className="control">
                                <input 
                                    type="password"
                                    className="input"
                                    placeholder="Ingresa la contraseña" 
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-success is-fullwidth">Registrate</button>
                            </div>
                        </div>
                    </form>
                    <p className="has-text-centered">Ya tienes una cuenta?<Link to='/login' className="has-text-success"> Inicia sesión</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
