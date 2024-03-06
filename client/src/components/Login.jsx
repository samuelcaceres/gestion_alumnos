import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const token = response.data.token;
            
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Correo o contraseña incorrecta.');
        }
    }

    return (
        <div className="columns is-centered is-vcentered is-fullheight" style={{ background: 'linear-gradient(to right, #4A77F7, #90A8F7)', margin: 0, height: '100vh' }}>
            <div className="column is-one-third">
                <div className="box" style={{ backgroundColor: 'white', height: '100%' }}>
                    <h2 className="title is-4 has-text-centered">Inicia Sesión</h2>
                    {error && <div className="notification is-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Correo</label>
                            <div className="control">
                                <input 
                                    type="email"
                                    className="input"
                                    placeholder="Ingresa el correo" 
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Contraseña</label>
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
                                <button type="submit" className="button is-success is-fullwidth">Inicia sesión</button>
                            </div>
                        </div>
                    </form>
                    <p className="has-text-centered">Aún no tienes una cuenta? <Link to="/">Registrate</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
