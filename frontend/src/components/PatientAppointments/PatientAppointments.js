import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientAppointments.css';

function PatientAppointments() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Filter states
  const [teethFilter, setTeethFilter] = useState('');
  const [treatmentFilter, setTreatmentFilter] = useState('');

  // Dummy data - replace with actual appointments data
  const [appointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '09:00',
      teeth: ['11', '12', '21'],
      treatment: 'Limpeza',
      cost: '50.00',
      status: 'Concluído'
    },
    {
      id: 2,
      date: '2024-03-20',
      time: '14:30',
      teeth: ['46'],
      treatment: 'Restauração',
      cost: '80.00',
      status: 'Agendado'
    },
    {
      id: 3,
      date: '2024-03-20',
      time: '14:30',
      teeth: ['46'],
      treatment: 'Restauração',
      cost: '80.00',
      status: 'Agendado'
    },
    {
      id: 4,
      date: '2024-03-20',
      time: '14:30',
      teeth: ['46'],
      treatment: 'Restauração',
      cost: '80.00',
      status: 'Agendado'
    },
    {
      id: 5,
      date: '2024-03-20',
      time: '14:30',
      teeth: ['46'],
      treatment: 'Restauração',
      cost: '80.00',
      status: 'Agendado'
    },
    {
      id: 6,
      date: '2024-03-20',
      time: '14:30',
      teeth: ['46'],
      treatment: 'Restauração',
      cost: '80.00',
      status: 'Agendado'
    }
    // Add more appointments as needed
  ]);

  // Filter options
  const treatmentOptions = [
    'Limpeza',
    'Restauração',
    'Extração',
    'Canal',
    'Implante',
    'Ortodontia'
  ];

  const teethOptions = [
    '11', '12', '13', '14', '15', '16', '17', '18',
    '21', '22', '23', '24', '25', '26', '27', '28',
    '31', '32', '33', '34', '35', '36', '37', '38',
    '41', '42', '43', '44', '45', '46', '47', '48'
  ];

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesTooth = !teethFilter || appointment.teeth.includes(teethFilter);
    const matchesTreatment = !treatmentFilter || appointment.treatment === treatmentFilter;
    return matchesTooth && matchesTreatment;
  });

  return (
    <div className="patient-appointments-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate('/patients')}>
          Voltar à Lista de Pacientes
        </a>
      </div>

      <div className="appointments-header">
        <h2>Consultas do Paciente</h2>
        <div className="header-buttons">
          <button 
            className="follow-up-btn"
            onClick={() => navigate(`/patient/${id}/follow-up`)}
          >
            Plano de Tratamento
          </button>
          <button 
            className="new-appointment-btn"
            onClick={() => navigate(`/patient/${id}/appointments/new`)}
          >
            + Nova Consulta
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Filtrar por Dente:</label>
          <select 
            value={teethFilter}
            onChange={(e) => setTeethFilter(e.target.value)}
          >
            <option value="">Todos os Dentes</option>
            {teethOptions.map(tooth => (
              <option key={tooth} value={tooth}>
                Dente {tooth}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filtrar por Tratamento:</label>
          <select 
            value={treatmentFilter}
            onChange={(e) => setTreatmentFilter(e.target.value)}
          >
            <option value="">Todos os Tratamentos</option>
            {treatmentOptions.map(treatment => (
              <option key={treatment} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="appointments-grid">
        {filteredAppointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <div className="appointment-date">
                <span className="date">{new Date(appointment.date).toLocaleDateString()}</span>
                <span className="time">{appointment.time}</span>
              </div>
              <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>

            <div className="appointment-details">
              <div className="details-row">
                <div className="detail-item">
                  <label>Tratamento:</label>
                  <span>{appointment.treatment}</span>
                </div>
                <div className="detail-item">
                  <label>Dentes:</label>
                  <span>{appointment.teeth.join(', ')}</span>
                </div>
              </div>
              {appointment.notes && (
                <div className="details-row">
                  <div className="detail-item notes">
                    <label>Notas:</label>
                    <span className="notes-text">{appointment.notes}</span>
                  </div>
                </div>
              )}
            </div>

            <button 
              className="edit-appointment-btn"
              onClick={() => navigate(`/patient/${id}/appointments/${appointment.id}`)}
            >
              Editar Consulta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientAppointments;