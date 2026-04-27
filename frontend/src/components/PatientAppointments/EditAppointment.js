import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditAppointment.css';

function EditAppointment() {
  const { id, appointmentId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data - replace with actual appointment fetch
  const [appointment, setAppointment] = useState({
    date: '2024-03-15',
    time: '09:00',
    teeth: ['11', '12', '21'],
    treatment: 'Limpeza',
    diagnosis: 'Gengivite leve',
    procedure: 'Limpeza profissional com ultrassom',
    materials: 'Pasta profilática, fio dental',
    notes: 'Paciente relatou sensibilidade ao frio',
    recommendations: 'Usar pasta sensível, retorno em 6 meses',
    cost: '50.00',
    status: 'Concluído',
    nextAppointment: '2024-09-15',
    xrayTaken: true,
    prescriptions: 'Ibuprofeno 400mg se necessário',
    complications: 'Nenhuma',
    followUpNeeded: true
  });

  const [editedData, setEditedData] = useState(appointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setAppointment(editedData);
    setIsEditing(false);
    alert('Alterações guardadas com sucesso!');
  };

  const renderField = (label, name, type = 'text', required = false) => {
    return (
      <div className="form-group">
        <label>{label}{required && '*'}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={editedData[name]}
            onChange={handleChange}
            disabled={!isEditing}
          />
        ) : type === 'checkbox' ? (
          <input
            type="checkbox"
            name={name}
            checked={editedData[name]}
            onChange={(e) => handleChange({
              target: {
                name,
                value: e.target.checked
              }
            })}
            disabled={!isEditing}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={editedData[name]}
            onChange={handleChange}
            disabled={!isEditing}
          />
        )}
      </div>
    );
  };

  return (
    <div className="edit-appointment-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate(`/patient/${id}/appointments`)}>
          Voltar às Consultas
        </a>
      </div>

      <div className="appointment-header">
        <h2>Detalhes da Consulta</h2>
        <div className="header-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Editar Consulta
            </button>
          ) : (
            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => {
                setEditedData(appointment);
                setIsEditing(false);
              }}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleSave}>
                Guardar Alterações
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="appointment-content">
        <section className="info-section">
          <h3>Informações Básicas</h3>
          <div className="form-grid">
            {renderField('Data', 'date', 'date', true)}
            {renderField('Hora', 'time', 'time', true)}
            {renderField('Status', 'status', 'text', true)}
            {renderField('Custo (€)', 'cost', 'number', true)}
          </div>
        </section>

        <section className="info-section">
          <h3>Detalhes do Tratamento</h3>
          <div className="form-grid">
            {renderField('Dentes Tratados', 'teeth', 'text', true)}
            {renderField('Tratamento', 'treatment', 'text', true)}
            {renderField('Diagnóstico', 'diagnosis', 'textarea')}
            {renderField('Procedimento', 'procedure', 'textarea')}
            {renderField('Materiais Utilizados', 'materials', 'textarea')}
          </div>
        </section>

        <section className="info-section">
          <h3>Observações Clínicas</h3>
          <div className="form-grid">
            {renderField('Notas', 'notes', 'textarea')}
            {renderField('Recomendações', 'recommendations', 'textarea')}
            {renderField('Prescrições', 'prescriptions', 'textarea')}
            {renderField('Complicações', 'complications', 'textarea')}
          </div>
        </section>

        <section className="info-section">
          <h3>Acompanhamento</h3>
          <div className="form-grid">
            {renderField('Próxima Consulta', 'nextAppointment', 'date')}
            {renderField('Raio-X Realizado', 'xrayTaken', 'checkbox')}
            {renderField('Necessita Acompanhamento', 'followUpNeeded', 'checkbox')}
          </div>
        </section>
      </div>

      <div className="form-actions">
        <button className="back-btn" onClick={() => navigate(`/patient/${id}/appointments`)}>
          Voltar às Consultas
        </button>
      </div>
    </div>
  );
}

export default EditAppointment;