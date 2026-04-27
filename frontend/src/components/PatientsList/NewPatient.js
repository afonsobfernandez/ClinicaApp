import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPatient.css';

function NewPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    
    // Legal Information
    idNumber: '',
    nif: '',
    insuranceProvider: '',
    policyNumber: '',
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    
    // Medical Information
    allergies: '',
    currentMedications: '',
    medicalConditions: '',
    familyHistory: '',
    surgicalHistory: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/patients');
  };

  return (
    <div className="new-patient-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate('/patients')}>
          Voltar à Lista de Pacientes
        </a>
      </div>
      <div className="new-patient-header">
        <h2>Registar Novo Paciente</h2>
      </div>

      <form onSubmit={handleSubmit} className="new-patient-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Informação Pessoal</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apelido*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data de Nascimento*</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Género</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Selecionar Género</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Morada</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Legal Information Section */}
        <div className="form-section">
          <h3>Informação Legal</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Cartão de Cidadão*</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>NIF*</label>
              <input
                type="text"
                name="nif"
                value={formData.nif}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Seguradora</label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Número da Apólice</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="form-section">
          <h3>Contacto de Emergência</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Nome*</label>
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Relação*</label>
              <input
                type="text"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone*</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="form-section">
          <h3>Informação Médica</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Alergias</label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Liste quaisquer alergias conhecidas..."
              />
            </div>
            <div className="form-group full-width">
              <label>Medicação Atual</label>
              <textarea
                name="currentMedications"
                value={formData.currentMedications}
                onChange={handleChange}
                placeholder="Liste medicação atual..."
              />
            </div>
            <div className="form-group full-width">
              <label>Condições Médicas</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="Liste condições médicas existentes..."
              />
            </div>
            <div className="form-group full-width">
              <label>Histórico Familiar</label>
              <textarea
                name="familyHistory"
                value={formData.familyHistory}
                onChange={handleChange}
                placeholder="Histórico médico familiar relevante..."
              />
            </div>
            <div className="form-group full-width">
              <label>Histórico Cirúrgico</label>
              <textarea
                name="surgicalHistory"
                value={formData.surgicalHistory}
                onChange={handleChange}
                placeholder="Cirurgias anteriores e datas..."
              />
            </div>
            <div className="form-group full-width">
              <label>Notas Adicionais</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Outras informações relevantes..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/patients')}>
            Cancelar
          </button>
          <button type="submit" className="submit-btn">
            Criar Paciente
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewPatient;