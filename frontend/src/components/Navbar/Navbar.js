import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isPatientRoute = location.pathname.includes('/patient/');

  const menuItems = [
    {
      path: "/",
      name: "Home",
      icon: "🏠"
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "📊"
    },
    {
      path: "/patients",
      name: "Pacientes",
      icon: "👥",
      isActive: (path) => path === '/patients' || path.includes('/patient/')
    },
    {
      path: "/calendar",
      name: "Calendário",
      icon: "�"
    },
    {
      path: "/login",
      name: "Login",
      icon: "🔐"
    },
    {
      path: "/test-database",
      name: "test"
    }


  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/">
          {/* Your logo here */}
          <span>Dental Clinic</span>
        </NavLink>
      </div>
      
      <div className="nav-items">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => {
              const active = item.isActive 
                ? item.isActive(location.pathname)
                : isActive;
              return active ? "nav-item active" : "nav-item";
            }}
            end
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;