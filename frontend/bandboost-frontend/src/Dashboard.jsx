import React, { useEffect } from 'react';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.clear(); // Wipe tokens
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>IELTS Preparation Dashboard</h1>
      <p>Welcome back! Ready for a practice test?</p>

      <button onClick={handleLogout} style={{ backgroundColor: '#ff4d4d', color: 'white' }}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;