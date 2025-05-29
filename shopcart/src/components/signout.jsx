import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignoutButton = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token'); 
    alert('Signout successfully!');
    navigate('/'); 
  };

  return (
    <button onClick={handleSignout} className="signout-button">
      Sign Out
    </button>
  );
};

export default SignoutButton;
