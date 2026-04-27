import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PatientList.css';

function PatientList({ onPatientSelect }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data - replace with actual data from database
  const [patients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', lastVisit: '2024-03-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891', lastVisit: '2024-03-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '123-456-7892', lastVisit: '2024-03-05' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', phone: '123-456-7892', lastVisit: '2024-03-05' },
    { id: 5, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', lastVisit: '2024-03-15' },
    { id: 6, name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891', lastVisit: '2024-03-10' },
    { id: 7, name: 'Bob Johnson', email: 'bob@example.com', phone: '123-456-7892', lastVisit: '2024-03-05' },
    { id: 8, name: 'Bob Johnson', email: 'bob@example.com', phone: '123-456-7892', lastVisit: '2024-03-05' },
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="patient-list">
      <div className="patient-list-header">
        <h2>Patient List</h2>
        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/new-patient" className="new-patient-btn">
            + New Patient
          </Link>
        </div>
      </div>

      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.lastVisit}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="view-profile-button"
                    onClick={() => navigate(`/patient/${patient.id}/profile`)}
                  >
                    Ver Perfil
                  </button>
                  <button 
                    className="view-appointments-button"
                    onClick={() => navigate(`/patient/${patient.id}/appointments`)}
                  >
                    Ver Consultas
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;