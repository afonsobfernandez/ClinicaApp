import React, { useState } from 'react';
import { useCustomNavigation } from '../../useCustomNavigation';
import Sidebar from './Sidebar';
import PatientList from './PatientList';
import MedicalInfo from './MedicalInfo';
import LegalInfo from './LegalInfo';
import MedicalHistory from './MedicalHistory';
import './Profile.css';

function Profile() {
  const { navigateTo } = useCustomNavigation();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeSection, setActiveSection] = useState('patient-list');

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'patient-list') {
      setSelectedPatient(null);
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActiveSection('appointment-history'); // Or any other default section you prefer
  };

  // Render the appropriate component based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'patient-list':
        return <PatientList onPatientSelect={handlePatientSelect} />;
      case 'medical-info':
        return <MedicalInfo patient={selectedPatient} />;
      case 'legal-info':
        return <LegalInfo patient={selectedPatient} />;
      case 'appointment-history':
        return <MedicalHistory patient={selectedPatient} />;
      default:
        return <PatientList onPatientSelect={handlePatientSelect} />;
    }
  };

  return (
    <div className="patients-profile">
      <Sidebar 
        selectedPatient={selectedPatient}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;