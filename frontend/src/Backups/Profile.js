import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomNavigation } from '../useCustomNavigation';
import PatientList from '../components/PatientsList/PatientList';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const handlePatientSelect = (patientId) => {
    navigate(`/patient/${patientId}`);
    console.log("Navigating to:", `/patient/${patientId}`);
  };

  return (
    <div className="patients-profile">
      <PatientList onPatientSelect={handlePatientSelect} />
    </div>
  );
}

export default Profile;