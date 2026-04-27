import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faHeartPulse, 
  faFileContract, 
  faCalendarCheck, 
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ selectedPatient, onSectionChange, activeSection }) {
  const sections = [
    {
      id: 'patient-list',
      name: 'Lista de Pacientes',
      icon: <FontAwesomeIcon icon={faUsers} />,
      alwaysVisible: true
    },
    {
      id: 'medical-info',
      name: 'Informação Médica',
      icon: <FontAwesomeIcon icon={faHeartPulse} />,
      alwaysVisible: false
    },
    {
      id: 'legal-info',
      name: 'Informação Legal',
      icon: <FontAwesomeIcon icon={faFileContract} />,
      alwaysVisible: false
    },
    {
      id: 'appointment-history',
      name: 'Consultas',
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      alwaysVisible: false
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {selectedPatient && (
          <div className="selected-patient">
            <div className="patient-avatar">
              {selectedPatient.name.charAt(0)}
            </div>
            <div className="patient-info">
              <h3>{selectedPatient.name}</h3>
              <p>ID: {selectedPatient.id}</p>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          (section.alwaysVisible || selectedPatient) && (
            <button
              key={section.id}
              className={`sidebar-link ${activeSection === section.id ? 'active' : ''} 
                ${!section.alwaysVisible && !selectedPatient ? 'disabled' : ''}`}
              onClick={() => onSectionChange(section.id)}
              disabled={!section.alwaysVisible && !selectedPatient}
            >
              <span className="section-icon">{section.icon}</span>
              {section.name}
              {activeSection === section.id && (
                <span className="active-indicator">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              )}
            </button>
          )
        ))}
      </nav>

      {selectedPatient && (
        <div className="sidebar-footer">
          <button 
            className="clear-selection"
            onClick={() => onSectionChange('patient-list')}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Patient List
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;