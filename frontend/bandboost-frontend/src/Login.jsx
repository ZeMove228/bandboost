import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize the hook

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/token/', {
                username,
                password,
            });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            navigate('/profile');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="mesh"></div>

            <nav>
                <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'white' }}>
                    BANDBOOST
                </Link>
            </nav>

            <div className="login-container">
                <div className="login-card bento-item">
                    <div className="hero-badge" style={{ width: 'fit-content', margin: '0 auto 20px' }}>
                        Secure Access
                    </div>
                    <h2>Welcome Back</h2>
                    <p style={{ color: '#888', marginBottom: '30px' }}>Enter your details to access predictions</p>

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="error-msg">{error}</p>}

                        <button type="submit" className="btn-glow" style={{ width: '100%', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                            Sign In to Dashboard
                        </button>
                    </form>

                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
                        Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;