import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarPatient.css';

const SidebarPatient = ({ patientId }) => {
  const menuItems = [
    {
      path: `/patient/${patientId}`,
      name: "Dados Pessoais",
      icon: "👤"
    },
    {
      path: `/patient/${patientId}/consultas`,
      name: "Histórico de Consultas",
      icon: "📋"
    },
    {
      path: `/patient/${patientId}/nova-consulta`,
      name: "Nova Consulta",
      icon: "➕"
    }
  ];

  return (
    <div className="patient-sidebar">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            isActive ? "patient-nav-item active" : "patient-nav-item"
          }
          end
        >
          <span className="icon">{item.icon}</span>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarPatient;