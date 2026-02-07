import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="dashboard-wrapper">
            <nav className="sidebar">
                <div className="logo"><img src="/logo.png" alt="logo" width="50" />BandBoost</div>
                <ul className="nav-links">
                    <li><Link to="/dashboard"><i className="fas fa-grid-2"></i> Dashboard</Link></li>
                    <li className="active"><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
                    <li><Link to="/tests"><i className="fas fa-book-open"></i> Practice</Link></li>
                </ul>
                <button className="logout-btn" onClick={() => {
    localStorage.clear();
    window.location.href = '/login';
}}>
    <div className="btn-content">
        <i className="fas fa-sign-out-alt"></i>
        <span>Terminate Session</span>
    </div>
    <div className="btn-glow-layer"></div>
</button>
            </nav>


            <main className="main-content">
                <div className="hero-badge">Student Profile</div>
                <h1>Welcome back, <span style={{color: 'var(--primary)'}}>Candidate</span></h1>

                <div className="bento" style={{gridTemplateRows: 'repeat(1, 250px)'}}>
                    <div className="bento-item">
                        <h3>Target Band</h3>
                        <h2 style={{fontSize: '3rem', color: 'var(--primary)'}}>8.5</h2>
                    </div>
                    <div className="bento-item">
                        <h3>Mock Tests Taken</h3>
                        <h2 style={{fontSize: '3rem'}}>12</h2>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;