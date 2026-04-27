import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import SidebarPatient from './SidebarPatient';
import PatientDetails from './PatientDetails';
import MedicalInfo from './MedicalInfo';
import LegalInfo from './LegalInfo';
import ConsultaDetail from '../components/Consulta/ConsultaDetail';
import NovaConsulta from '../components/Consulta/NovaConsulta';
import './PatientLayout.css';

function PatientLayout() {
    const { id } = useParams();
    console.log("PatientLayout ID:", id); // Debug log
  
    return (
      <div className="patient-layout">
        <SidebarPatient patientId={id} />
        <div className="patient-content">
          <Routes>
            <Route index element={<PatientDetails />} />
            <Route path="consultas" element={<ConsultaDetail />} />
            <Route path="nova-consulta" element={<NovaConsulta />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default PatientLayout;