import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/GoBack/BackButton';
import './PatientDetails.css';

const PatientDetails = () => {
    const { id } = useParams();
  
    // Add this console.log to debug
    console.log("Patient ID from URL:", id);
  
    // Dummy data - match with your PatientList data structure
    const patientData = {
      id: 1,
      name: 'John Doe',
      birthDate: '15/05/1990',
      nif: '123456789',
      phone: '912345678',
      email: 'john@example.com',
      address: 'Rua Principal, 123',
      profession: 'Engenheiro',
      civilStatus: 'Casado'
    };
  
    return (
      <div className="patient-details">
        <BackButton />
        <div className="patient-details-header">
          <h2>Dados do Paciente (ID: {id})</h2>
        </div>
        
        <div className="patient-details-content">
          <div className="patient-info-card">
            <div className="info-section">
              <h3>Informação Pessoal</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nome</label>
                  <p>{patientData.name}</p>
                </div>
                <div className="info-item">
                  <label>Data de Nascimento</label>
                  <p>{patientData.birthDate}</p>
                </div>
                <div className="info-item">
                  <label>NIF</label>
                  <p>{patientData.nif}</p>
                </div>
                <div className="info-item">
                  <label>Telefone</label>
                  <p>{patientData.phone}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{patientData.email}</p>
                </div>
                <div className="info-item">
                  <label>Morada</label>
                  <p>{patientData.address}</p>
                </div>
              </div>
            </div>
  
            <div className="info-section">
              <h3>Informação Adicional</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Profissão</label>
                  <p>{patientData.profession}</p>
                </div>
                <div className="info-item">
                  <label>Estado Civil</label>
                  <p>{patientData.civilStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PatientDetails;