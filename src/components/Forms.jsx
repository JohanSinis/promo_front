import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import './styles/Forms.css';

function Forms({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        const loginData = {
            email: username, // Asegúrate de que el "username" se use como correo
            password,
        };

        try {
            const response = await fetch('http://localhost:4000/v1/promo/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.status);
                callback(result.userId, result.role); // Asegúrate de que el backend devuelva el userId y el role
                console.log('Login exitoso:', { username, password });
                navigate('/reclamar-codigo'); // Navega a la ruta deseada después del login
            } else {
                setError(result.message); // Cambiado para usar message del resultado
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setError('Error al intentar iniciar sesión. Intente de nuevo más tarde.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">¡BIENVENIDO A NUESTRO PORTAL!</h2>
            <p className="login-subtitle"></p>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="form-group">
                <label htmlFor="username">
                    <span className="icon"></span> USUARIO
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    required // Agrega required para mejor validación
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    <span className="icon"></span> CONTRASEÑA
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required // Agrega required para mejor validación
                />
            </div>
            <button className="login-button" onClick={handleLogin}>INICIAR SESION</button>
            <Link to="/registro" className="register-button">REGISTRATE AHORA
            Y EMPIEZA A GANAR!</Link>
        </div>
    );
}   

export default Forms;
