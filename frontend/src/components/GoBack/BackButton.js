import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will go back one step in the history
  };

  return (
    <button className="back-button" onClick={goBack}>
      ← Voltar
    </button>
  );
};

export default BackButton;