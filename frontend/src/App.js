import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './NavigationContext';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import PatientList from './components/PatientsList/PatientList';
import PatientProfile from './components/PatientsProfile/PatientProfile';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NewPatient from './components/PatientsList/NewPatient';
import PatientAppointments from './components/PatientAppointments/PatientAppointments';
import NewAppointment from './components/PatientAppointments/NewAppointment';
import EditAppointment from './components/PatientAppointments/EditAppointment';
import Calendar from './components/Calendar/Calendar';
import PatientFollowUp from './components/PatientAppointments/PatientFollowUp';
import TestDatabasePage from './components/Test/TestDatabasePage';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/new-patient" element={<NewPatient />} />
            <Route path="/patient/:id/profile" element={<PatientProfile />} />
            <Route path="/patient/:id/appointments" element={<PatientAppointments />} />
            <Route path="/patient/:id/appointments/new" element={<NewAppointment />} />
            <Route path="/patient/:id/appointments/:appointmentId" element={<EditAppointment />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/patient/:id/follow-up" element={<PatientFollowUp />} />
            <Route path="/test-database" element={<TestDatabasePage />} />
          </Routes>
        </div>
      </NavigationProvider>
    </Router>
  );
}

export default App;
