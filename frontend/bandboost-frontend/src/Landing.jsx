import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    useEffect(() => {
        // Preloader Logic
        const loader = document.getElementById('loader');
        const timer = setTimeout(() => {
            if (loader) loader.style.transform = 'translateY(-100%)';
        }, 1800);


        // Parallax Effect
        const handleMouseMove = (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
            const mesh = document.querySelector('.mesh');
            if (mesh) mesh.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
        // Force the loader to disappear after 1.8 seconds
        const timer = setTimeout(() => {
            loader.style.transform = 'translateY(-100%)';
        }, 1800);
        return () => clearTimeout(timer);
    }
}, []);

    return (
        <div className="landing-wrapper">
            <div id="loader">
                <div className="loader-text">IELTS BOOSTER</div>
            </div>

            <div className="mesh"></div>

            <nav>
                <div className="logo"><img src="/logo.png" alt="logo" width="70" /></div>
                <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <a href="#forecast" style={{ color: '#aaa', textDecoration: 'none' }}>Predictions</a>
                    <a href="#forecast" style={{ color: '#aaa', textDecoration: 'none' }}>About Us</a>
                    <a href="#forecast" style={{ color: '#aaa', textDecoration: 'none' }}>Pricing</a>
                    <Link to="/login" className="btn-glow" style={{ padding: '12px 25px' }}>Sign In</Link>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-badge">Updated for February 2026 Exams</div>
                <h1>Predicting the <br /><span>Unpredictable.</span></h1>
                <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize: '1.2rem' }}>
                    The world's most advanced data-driven IELTS forecast. <br />
                    94% accuracy rate in Writing & Speaking topics.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link to="/login" className="btn-glow">Access Predictions</Link>
                    <a href="#" style={{ color: 'white', padding: '18px', textDecoration: 'none' }} className="watchDemo">
                        Try Demo <i className="fas fa-play" style={{ marginLeft: '10px', fontSize: '0.8rem' }}></i>
                    </a>
                </div>
            </section>


            <section id="forecast" style={{ padding: '100px 8%' }}>
                <div className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800' }}>The Engine</h2>
                </div>
                <div className="bento">
                    <div className="bento-item wide">
                        <i className="fas fa-brain" style={{ fontSize: '2rem', color: '#6366f1', marginBottom: '20px' }}></i>
                        <h3>AI-Powered Writing</h3>
                        <p style={{ color: '#888', marginTop: '15px' }}>We analyze 10,000+ past exams to predict Task 1 and Task 2 prompts with surgical precision.</p>
                    </div>
                    <div className="bento-item tall">
                        <i className="fas fa-microphone" style={{ fontSize: '2rem', color: '#f43f5e', marginBottom: '20px' }}></i>
                        <h3>Speaking Bank</h3>
                        <p style={{ color: '#888', marginTop: '15px' }}>Real-time updates from global test centers. All Cue Cards for Feb-May 2026 included.</p>
                    </div>
                    <div className="bento-item">
                        <i className="fas fa-bolt" style={{ fontSize: '2rem', color: '#eab308', marginBottom: '20px' }}></i>
                        <h3>Instant Access</h3>
                        <p style={{ color: '#888', marginTop: '15px' }}>No waiting. PDF model answers ready immediately.</p>
                    </div>

                    <div className="bento-item wide">
                        <i className="fas fa-shield-halved" style={{ fontSize: '2rem', color: '#22c55e', marginBottom: '20px' }}></i>
                        <h3>High Accuracy</h3>
                        <p style={{ color: '#888', marginTop: '15px' }}>94% of our students report seeing at least two predicted topics in their actual exam.</p>
                    </div>
                    <div className="bento-item">
                        <i className="fas fa-lock" style={{ fontSize: '2rem', color: 'green', marginBottom: '20px' }}></i>
                        <h3>Secure</h3>
                        <p style={{ color: '#888', marginTop: '15px' }}>100% Secure and Transparent. With us your Ielts is locked.</p>
                    </div>
                </div>
            </section>

            {/* --- PRICING SECTION --- */}
            <section style={{ background: 'rgba(255,255,255,0.02)', padding: '100px 8%' }}>
                <div className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '3rem' }}>Simple Pricing</h2>
                    <p style={{ color: '#888' }}>Invest in your future. One-time payment.</p>
                </div>
                <div className="pricing">
                    <div className="price-card">
                        <h3>Free Tier</h3>
                        <h2 style={{ fontSize: '3rem', margin: '20px 0' }}>$0</h2>
                        <ul style={{ listStyle: 'none', color: '#888', lineHeight: '2.5', textAlign: 'left' }}>
                            <li><i className="fas fa-check" style={{ marginRight: '10px' }}></i> Basic Topic List</li>
                            <li><i className="fas fa-check" style={{ marginRight: '10px' }}></i> Weekly Trend Report</li>
                            <li><i className="fas fa-times" style={{ marginRight: '10px', color: '#f43f5e' }}></i> 3 Mock Tests</li>
                        </ul>
                    </div>
                    <div className="price-card featured">
                        <h3>TheBoost</h3>
                        <h2 style={{ fontSize: '3rem', margin: '20px 0' }}>$13</h2>
                        <ul style={{ listStyle: 'none', lineHeight: '2.5', textAlign: 'left' }}>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> Full 2026 Prediction Bank</li>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> 8.0+ Model Essays</li>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> AI assistant</li>
                        </ul>
                        <Link to="/login" className="btn-glow" style={{ display: 'block', textAlign: 'center', marginTop: '30px', textDecoration: 'none' }}>Get Started</Link>
                    </div>
                    <div className="price-card">
                        <h3>Boost Premium</h3>
                        <h2 style={{ fontSize: '3rem', margin: '20px 0' }}>$20</h2>
                        <ul style={{ listStyle: 'none', lineHeight: '2.5', textAlign: 'left' }}>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> Full 2026 Prediction Bank</li>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> Unlimited Practice</li>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> Mock tests just for you</li>
                            <li><i className="fas fa-check" style={{ color: '#6366f1', marginRight: '10px' }}></i> Personal trainer</li>
                        </ul>
                        <Link to="/login" className="btn-glow" style={{ display: 'block', textAlign: 'center', marginTop: '30px', textDecoration: 'none' }}>Get Started</Link>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer style={{ padding: '80px 8% 40px', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
                    <div>
                        <div className="logo">BandBooster</div>
                        <p style={{ color: '#555', marginTop: '15px', maxWidth: '300px' }}>Engineering Band 9s with data science and historical analysis.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '60px' }}>
                        <div className="footer-col">
                            <h4 style={{ marginBottom: '20px' }}>Platform</h4>
                            <p style={{ color: '#888', marginBottom: '10px' }}>Predictions</p>
                            <p style={{ color: '#888', marginBottom: '10px' }}>Courses</p>
                        </div>
                        <div className="footer-col">
                            <h4 style={{ marginBottom: '20px' }}>Social</h4>
                            <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem' }}>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-telegram"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center', color: '#333', marginTop: '60px', fontSize: '0.8rem' }}>
                    © 2026 BandBooster AI. Not affiliated with IDP, British Council, or Cambridge.
                </p>
            </footer>
        </div>
    );
};

export default Landing;