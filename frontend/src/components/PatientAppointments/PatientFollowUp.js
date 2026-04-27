import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PatientFollowUp.css';

function PatientFollowUp() {
  const { id } = useParams();
  const navigate = useNavigate();
  
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

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      date: '2024-03-20',
      endDate: '2024-04-20',
      description: 'Verificar evolução do tratamento na região 46',
      treatment: 'Canal',
      teeth: ['46'],
      notes: 'Paciente relatou sensibilidade',
      priority: 'high',
      status: 'pending'
    }
  ]);

  const [newFollowUp, setNewFollowUp] = useState({
    description: '',
    treatment: '',
    teeth: [],
    notes: '',
    priority: 'medium',
    status: 'pending',
    endDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...newFollowUp
    };
    setFollowUps([newItem, ...followUps]);
    setNewFollowUp({
      description: '',
      treatment: '',
      teeth: [],
      notes: '',
      priority: 'medium',
      status: 'pending',
      endDate: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este acompanhamento?')) {
      setFollowUps(followUps.filter(item => item.id !== id));
    }
  };

  return (
    <div className="follow-up-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate(`/patient/${id}/appointments`)}>
          Voltar às Consultas
        </a>
      </div>

      <div className="follow-up-header">
        <h2>Plano de Tratamento</h2>
      </div>

      <form onSubmit={handleSubmit} className="follow-up-form">
        <div className="form-row">
          <div className="form-group description">
            <label>Descrição</label>
            <input
              type="text"
              placeholder="Adicionar novo item de acompanhamento..."
              value={newFollowUp.description}
              onChange={(e) => setNewFollowUp({
                ...newFollowUp,
                description: e.target.value
              })}
              required
            />
          </div>
        </div>

        <div className="form-row three-columns">
          <div className="form-group">
            <label>Tratamento</label>
            <select
              value={newFollowUp.treatment}
              onChange={(e) => setNewFollowUp({
                ...newFollowUp,
                treatment: e.target.value
              })}
              required
            >
              <option value="">Selecione o tratamento</option>
              {treatmentOptions.map(treatment => (
                <option key={treatment} value={treatment}>{treatment}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Dentes</label>
            <div className="teeth-selection">
              {teethOptions.map(tooth => (
                <button
                  key={tooth}
                  type="button"
                  className={`tooth-button ${newFollowUp.teeth.includes(tooth) ? 'selected' : ''}`}
                  onClick={() => {
                    setNewFollowUp(prev => {
                      const newTeeth = prev.teeth.includes(tooth)
                        ? prev.teeth.filter(t => t !== tooth)
                        : [...prev.teeth, tooth];
                      return { ...prev, teeth: newTeeth };
                    });
                  }}
                >
                  {tooth}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Prioridade</label>
            <select
              value={newFollowUp.priority}
              onChange={(e) => setNewFollowUp({
                ...newFollowUp,
                priority: e.target.value
              })}
            >
              <option value="low">Baixa Prioridade</option>
              <option value="medium">Média Prioridade</option>
              <option value="high">Alta Prioridade</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Notas</label>
            <textarea
              value={newFollowUp.notes}
              onChange={(e) => setNewFollowUp({
                ...newFollowUp,
                notes: e.target.value
              })}
              placeholder="Adicione notas relevantes..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-row submit-row">
          <div className="form-group date-group">
            <label>Data Final</label>
            <input
              type="date"
              value={newFollowUp.endDate}
              onChange={(e) => setNewFollowUp({
                ...newFollowUp,
                endDate: e.target.value
              })}
              required
            />
          </div>
          <button type="submit" className="add-btn">
            Adicionar Acompanhamento
          </button>
        </div>
      </form>

      <div className="follow-ups-list">
        {followUps.map(item => (
          <div key={item.id} className={`follow-up-item priority-${item.priority}`}>
            <div className="follow-up-content">
              <div className="follow-up-header">
                <div className="follow-up-dates">
                  <span className="follow-up-date">Criado em: {new Date(item.date).toLocaleDateString()}</span>
                  <span className="follow-up-date">Até: {new Date(item.endDate).toLocaleDateString()}</span>
                </div>
                <div className="follow-up-actions">
                  <button
                    className="status-toggle"
                    onClick={() => {
                      const newStatus = item.status === 'pending' ? 'completed' : 'pending';
                      setFollowUps(followUps.map(f => 
                        f.id === item.id ? {...f, status: newStatus} : f
                      ));
                    }}
                  >
                    {item.status === 'pending' ? '⭕' : '✅'}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className={`follow-up-details ${item.status === 'completed' ? 'completed' : ''}`}>
                <p className="description">{item.description}</p>
                <div className="details-row">
                  <span className="detail-item">Tratamento: {item.treatment}</span>
                  <span className="detail-item">Dentes: {item.teeth.join(', ')}</span>
                </div>
                {item.notes && <p className="notes">Notas: {item.notes}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientFollowUp;
