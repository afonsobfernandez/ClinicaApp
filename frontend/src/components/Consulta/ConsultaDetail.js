import React, { useState } from 'react';
import './ConsultaDetail.css';
import BackButton from '../GoBack/BackButton';
import { useCustomNavigation } from '../../useCustomNavigation';
import { useParams } from 'react-router-dom';

const ConsultaDetail = () => {
  const { navigateTo, goBack } = useCustomNavigation();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-20',
      startTime: '14:00',
      endTime: '15:00',
      patientName: 'João Silva',
      patientId: 'PT001',
      treatmentType: 'Limpeza',
      doctor: 'Dr. Teresa',
      procedures: [
        { name: 'Limpeza Dentária', tooth: 'All', price: 50 },
        { name: 'Polimento', tooth: 'All', price: 30 }
      ],
      observations: 'Paciente apresentou boa resposta ao tratamento.',
      totalPrice: 80
    },
  ]);

  const [editedAppointments, setEditedAppointments] = useState({});
  
  const handleChange = (appointmentId, field, value, procedureIndex = null) => {
    setEditedAppointments(prev => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        ...appointments.find(a => a.id === appointmentId),
        [field]: value
      }
    }));
  };

  const handleProcedureChange = (appointmentId, procedureIndex, field, value) => {
    setEditedAppointments(prev => {
      const appointment = {
        ...prev[appointmentId],
        ...appointments.find(a => a.id === appointmentId),
        procedures: [...(prev[appointmentId]?.procedures || appointments.find(a => a.id === appointmentId).procedures)]
      };
      appointment.procedures[procedureIndex] = {
        ...appointment.procedures[procedureIndex],
        [field]: field === 'price' ? Number(value) : value
      };
      return { ...prev, [appointmentId]: appointment };
    });
  };

  const handleSave = (appointmentId) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === appointmentId ? { ...app, ...editedAppointments[appointmentId] } : app
      )
    );
    setEditedAppointments(prev => {
      const newEdited = { ...prev };
      delete newEdited[appointmentId];
      return newEdited;
    });
  };

  const hasChanges = (appointmentId) => {
    return !!editedAppointments[appointmentId];
  };

  return (
    <div className="consulta-detail">
      <div className="consulta-detail-header">
        <h2>Histórico de Consultas</h2>
      </div>

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <div className="appointment-date">
                <input
                  type="date"
                  value={editedAppointments[appointment.id]?.date || appointment.date}
                  onChange={(e) => handleChange(appointment.id, 'date', e.target.value)}
                />
                <input
                  type="time"
                  value={editedAppointments[appointment.id]?.startTime || appointment.startTime}
                  onChange={(e) => handleChange(appointment.id, 'startTime', e.target.value)}
                />
                -
                <input
                  type="time"
                  value={editedAppointments[appointment.id]?.endTime || appointment.endTime}
                  onChange={(e) => handleChange(appointment.id, 'endTime', e.target.value)}
                />
              </div>
              <div className="appointment-patient">
                <input
                  type="text"
                  value={editedAppointments[appointment.id]?.patientName || appointment.patientName}
                  onChange={(e) => handleChange(appointment.id, 'patientName', e.target.value)}
                />
                <input
                  type="text"
                  value={editedAppointments[appointment.id]?.patientId || appointment.patientId}
                  onChange={(e) => handleChange(appointment.id, 'patientId', e.target.value)}
                />
              </div>
              <div className="appointment-doctor">
                <input
                  type="text"
                  value={editedAppointments[appointment.id]?.doctor || appointment.doctor}
                  onChange={(e) => handleChange(appointment.id, 'doctor', e.target.value)}
                />
                <input
                  type="text"
                  value={editedAppointments[appointment.id]?.treatmentType || appointment.treatmentType}
                  onChange={(e) => handleChange(appointment.id, 'treatmentType', e.target.value)}
                />
              </div>
            </div>

            <div className="procedures-list">
              <h4>Procedimentos Realizados</h4>
              <table>
                <thead>
                  <tr>
                    <th>Procedimento</th>
                    <th>Dente</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {(editedAppointments[appointment.id]?.procedures || appointment.procedures).map((procedure, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={procedure.name}
                          onChange={(e) => handleProcedureChange(appointment.id, index, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={procedure.tooth}
                          onChange={(e) => handleProcedureChange(appointment.id, index, 'tooth', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={procedure.price}
                          onChange={(e) => handleProcedureChange(appointment.id, index, 'price', e.target.value)}
                        />€
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="appointment-footer">
              <div className="observations">
                <h4>Observações</h4>
                <textarea
                  value={editedAppointments[appointment.id]?.observations || appointment.observations}
                  onChange={(e) => handleChange(appointment.id, 'observations', e.target.value)}
                />
              </div>
              <div className="total-price">
                <h4>Total</h4>
                <p>{appointment.totalPrice}€</p>
              </div>
              {hasChanges(appointment.id) && (
                <button 
                  className="save-button"
                  onClick={() => handleSave(appointment.id)}
                >
                  Guardar Alterações
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultaDetail;