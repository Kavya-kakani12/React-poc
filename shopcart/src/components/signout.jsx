import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token'); // Clear login token or session
    alert('Signout successfully!');
    navigate('/'); // Redirect to home or login page
  };

  return (
    <button onClick={handleSignout} className="signout-button">
      Sign Out
    </button>
  );
};

export default SignoutButton;
