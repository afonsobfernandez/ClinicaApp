import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientProfile.css';

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data - replace with actual patient data fetch
  const [patientData, setPatientData] = useState({
    // Personal Information
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: 'Rua Principal, 123',
    
    // Legal Information
    idNumber: '12345678',
    nif: '987654321',
    insuranceProvider: 'Seguradora ABC',
    policyNumber: 'POL123456',
    
    // Emergency Contact
    emergencyName: 'Jane Doe',
    emergencyRelation: 'Spouse',
    emergencyPhone: '123-456-7899',
    
    // Medical Information
    allergies: 'Penicillin',
    currentMedications: 'None',
    medicalConditions: 'Hypertension',
    familyHistory: 'Diabetes',
    surgicalHistory: 'Appendectomy 2015',
    notes: 'Regular checkups every 6 months'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(patientData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the patient data
    setPatientData(editedData);
    setIsEditing(false);
    // Show success message
    alert('Alterações guardadas com sucesso!');
  };

  const renderField = (label, name, type = 'text', required = false) => {
    return (
      <div className="form-group">
        <label>{label}{required && '*'}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={editedData[name]}
            onChange={handleChange}
            disabled={!isEditing}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={editedData[name]}
            onChange={handleChange}
            disabled={!isEditing}
          />
        )}
      </div>
    );
  };

  return (
    <div className="patient-profile-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate('/patients')}>
          Voltar à Lista de Pacientes
        </a>
      </div>

      <div className="profile-header">
        <h2>Perfil do Paciente</h2>
        <div className="header-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => {
                setEditedData(patientData);
                setIsEditing(false);
              }}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleSave}>
                Guardar Alterações
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <section className="info-section">
          <h3>Informação Pessoal</h3>
          <div className="form-grid">
            {renderField('Nome', 'firstName', 'text', true)}
            {renderField('Apelido', 'lastName', 'text', true)}
            {renderField('Data de Nascimento', 'dateOfBirth', 'date', true)}
            <div className="form-group">
              <label>Género</label>
              <select
                name="gender"
                value={editedData.gender}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
            {renderField('Email', 'email', 'email', true)}
            {renderField('Telefone', 'phone', 'tel', true)}
            {renderField('Morada', 'address', 'text')}
          </div>
        </section>

        <section className="info-section">
          <h3>Informação Legal</h3>
          <div className="form-grid">
            {renderField('Cartão de Cidadão', 'idNumber', 'text', true)}
            {renderField('NIF', 'nif', 'text', true)}
            {renderField('Seguradora', 'insuranceProvider')}
            {renderField('Número da Apólice', 'policyNumber')}
          </div>
        </section>

        <section className="info-section">
          <h3>Contacto de Emergência</h3>
          <div className="form-grid">
            {renderField('Nome', 'emergencyName', 'text', true)}
            {renderField('Relação', 'emergencyRelation', 'text', true)}
            {renderField('Telefone', 'emergencyPhone', 'tel', true)}
          </div>
        </section>

        <section className="info-section">
          <h3>Informação Médica</h3>
          <div className="form-grid">
            {renderField('Alergias', 'allergies', 'textarea')}
            {renderField('Medicação Atual', 'currentMedications', 'textarea')}
            {renderField('Condições Médicas', 'medicalConditions', 'textarea')}
            {renderField('Histórico Familiar', 'familyHistory', 'textarea')}
            {renderField('Histórico Cirúrgico', 'surgicalHistory', 'textarea')}
            {renderField('Notas Adicionais', 'notes', 'textarea')}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PatientProfile;