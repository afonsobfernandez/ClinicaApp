import React, { useState } from 'react';
import './NovaConsulta.css';
import { Link } from 'react-router-dom';
import Sidebar from '../../Backups/Sidebar';

const NovaConsulta = ({ patient }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    treatmentType: '',
    doctor: '',
    teethNumbers: [],
    procedures: [],
    observations: '',
    totalPrice: 0
  });

  const [procedure, setProcedure] = useState({
    name: '',
    tooth: '',
    price: ''
  });


  const doctor = [
    'Teresa',
    'Carolina',
    'Pedro'
  ];

  const addProcedure = () => {
    if (procedure.name && procedure.tooth && procedure.price) {
      setAppointmentDetails(prev => ({
        ...prev,
        procedures: [...prev.procedures, procedure],
        totalPrice: prev.totalPrice + Number(procedure.price)
      }));
      setProcedure({ name: '', tooth: '', price: '' });
    }
  };

  const removeProcedure = (index) => {
    setAppointmentDetails(prev => ({
      ...prev,
      procedures: prev.procedures.filter((_, i) => i !== index),
      totalPrice: prev.totalPrice - Number(prev.procedures[index].price)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to backend
    console.log(appointmentDetails);
  };

  return (
    <div className="nova-consulta">
      <div className="consulta-header">
        <h2>Nova Consulta</h2>
        <span>Paciente:</span> {/* adicionar o nome do paciente da base de dados */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={appointmentDetails.date}
              onChange={(e) => setAppointmentDetails(prev => ({
                ...prev,
                date: e.target.value
              }))}
            />
          </div>

          <div className="form-group">
            <label>Médico Responsável</label>
            <select
              value={appointmentDetails.doctor}
              onChange={(e) => setAppointmentDetails(prev => ({
                ...prev,
                doctor: e.target.value
              }))}
            >
              <option value="">Selecione o médico</option>
              {doctor.map(doc => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="procedures-section">
          <h3>Procedimentos Realizados</h3>
          
          <div className="add-procedure">
            <input
              type="text"
              placeholder="Procedimento"
              value={procedure.name}
              onChange={(e) => setProcedure(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
            <input
              type="text"
              placeholder="Dente Nº"
              value={procedure.tooth}
              onChange={(e) => setProcedure(prev => ({
                ...prev,
                tooth: e.target.value
              }))}
            />
            <input
              type="number"
              placeholder="Preço €"
              value={procedure.price}
              onChange={(e) => setProcedure(prev => ({
                ...prev,
                price: e.target.value
              }))}
            />
            <button type="button" onClick={addProcedure} className="add-btn">
              Adicionar
            </button>
          </div>

          <div className="procedures-list">
            {appointmentDetails.procedures.map((proc, index) => (
              <div key={index} className="procedure-item">
                <span>{proc.name}</span>
                <span>Dente: {proc.tooth}</span>
                <span>{proc.price}€</span>
                <button 
                  type="button" 
                  onClick={() => removeProcedure(index)}
                  className="remove-btn"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="observations-section">
          <label>Observações</label>
          <textarea
            value={appointmentDetails.observations}
            onChange={(e) => setAppointmentDetails(prev => ({
              ...prev,
              observations: e.target.value
            }))}
            rows={4}
          />
        </div>

        <div className="total-section">
          <h3>Total: {appointmentDetails.totalPrice}€</h3>
        </div>

        <div className="form-actions">
          <Link to="/patient-profile" type="submit" className="save-btn">
            Salvar Consulta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NovaConsulta;
