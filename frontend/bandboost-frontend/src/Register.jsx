import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match!");
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/register/', formData);
            alert("Account created! You can now login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try a different username.');
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
            <div className="login-container" style={{ marginTop: '60px'}}>
                <div className="login-card bento-item">
                    <div className="hero-badge" style={{ width: 'fit-content', margin: '0 auto 20px' }}>Join the Elite</div>
                    <h2>Create Account</h2>
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                        </div>
                        <div className="input-group">
                            <input type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Confirm Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                        <button type="submit" className="btn-glow" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>Register Now</button>
                    </form>
                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;