import React, { useState, useEffect } from 'react';
import './AppointmentModal.css';

function AppointmentModal({ isOpen, onClose, onSave, selectedSlot, patients }) {
  const initialFormState = {
    patientId: '',
    date: '',
    time: '',
    duration: '30',
    type: '', // Treatment type
    teeth: [], // Selected teeth
    status: 'scheduled',
    priority: 'normal',
    notes: '',
    symptoms: '',
    treatment: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patients);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setSearchTerm('');
    } else if (selectedSlot) {
      setFormData({
        ...initialFormState,
        date: selectedSlot.date,
        time: selectedSlot.time,
        duration: selectedSlot.duration.toString()
      });
    } else {
      setFormData(initialFormState);
    }
  }, [isOpen, selectedSlot]);

  useEffect(() => {
    const filtered = patients.filter(patient => 
      `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{selectedSlot ? 'Agendar Consulta para o Horário Selecionado' : 'Agendar Nova Consulta'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Procurar Paciente*</label>
            <input
              type="text"
              placeholder="Procurar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select 
              name="patientId" 
              value={formData.patientId}
              onChange={handleChange}
              required
              className="patient-select"
            >
              <option value="">Selecionar Paciente</option>
              {filteredPatients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Hora*</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Duração*</label>
              <select 
                name="duration" 
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="30">30 min</option>
                <option value="60">1 hora</option>
                <option value="90">1 hora 30 min</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Consulta*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Selecionar Tipo</option>
                <option value="checkup">Check-up</option>
                <option value="cleaning">Limpeza</option>
                <option value="treatment">Tratamento</option>
                <option value="emergency">Emergência</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioridade</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgente</option>
                <option value="low">Baixa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="scheduled">Agendado</option>
                <option value="confirmed">Confirmado</option>
                <option value="waiting">Em Espera</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Sintomas/Queixa</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="2"
              placeholder="Descreva os sintomas ou queixa do paciente..."
            />
          </div>

          <div className="form-group">
            <label>Tratamento Previsto</label>
            <textarea
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              rows="2"
              placeholder="Descreva o tratamento previsto..."
            />
          </div>

          <div className="form-group">
            <label>Notas Adicionais</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              placeholder="Notas adicionais sobre a consulta..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;