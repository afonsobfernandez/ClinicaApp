import React from 'react';
import './MedicalHistory.css';
import { Link } from 'react-router-dom';

function MedicalHistory({ patient }) {
  if (!patient) return <div>No patient selected</div>;

  // Dummy data - replace with actual data from database
  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '10:00 AM',
      type: 'Check-up',
      doctor: 'Dr. Smith',
      notes: 'Regular check-up, no issues found',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '2:30 PM',
      type: 'Cleaning',
      doctor: 'Dr. Johnson',
      notes: 'Regular cleaning performed',
      status: 'Completed'
    },
    // Add more appointment history as needed
  ];

  return (
    <div className="appointment-history">
      <div className="appointment-header">
        <h2>Consultas</h2>
        <Link to="/nova-consulta" className="new-appointment-btn">Adicionar Consulta</Link>
      </div>

      <div className="appointments-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-date">
              <div className="date">{appointment.date}</div>
              <div className="time">{appointment.time}</div>
            </div>
            
            <div className="appointment-details">
              <div className="detail-row">
                <span className="label">Type:</span>
                <span className="value">{appointment.type}</span>
              </div>
              <div className="detail-row">
                <span className="label">Doctor:</span>
                <span className="value">{appointment.doctor}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>
            </div>

            <div className="appointment-notes">
              <h4>Notes</h4>
              <p>{appointment.notes}</p>
            </div>

            <div className="appointment-actions">
              <Link to="/consulta-detail"  className="view-details-btn">Ver Detalhes</Link>
              <button className="edit-btn">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalHistory;