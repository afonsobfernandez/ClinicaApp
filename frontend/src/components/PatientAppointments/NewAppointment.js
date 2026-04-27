import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewAppointment.css';

const ToothShape = ({ number, selected, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`tooth-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
      data-tooth={number}
    >
      {number}
    </button>
  );
};

function NewAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    status: 'Agendado',
    cost: '',
    treatments: [],
    notes: '',
    recommendations: '',
    prescriptions: '',
    complications: '',
    nextAppointment: '',
    xrayTaken: false,
    followUpNeeded: false
  });

  const [currentTreatment, setCurrentTreatment] = useState({
    teeth: [],
    type: '',
    diagnosis: '',
    procedure: '',
    materials: ''
  });

  const treatmentOptions = [
    'Limpeza',
    'Restauração',
    'Extração',
    'Canal',
    'Implante',
    'Ortodontia',
    'Branqueamento',
    'Prótese',
    'Outro'
  ];

  const teethOptions = [
    '11', '12', '13', '14', '15', '16', '17', '18',
    '21', '22', '23', '24', '25', '26', '27', '28',
    '31', '32', '33', '34', '35', '36', '37', '38',
    '41', '42', '43', '44', '45', '46', '47', '48'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTreatmentChange = (e) => {
    const { name, value } = e.target;
    setCurrentTreatment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeethSelection = (tooth) => {
    setCurrentTreatment(prev => {
      if (tooth === 'Geral') {
        return {
          ...prev,
          teeth: ['Geral']
        };
      }
      
      const newTeeth = prev.teeth.includes('Geral') 
        ? [tooth]
        : prev.teeth.includes(tooth)
          ? prev.teeth.filter(t => t !== tooth)
          : [...prev.teeth, tooth];
      
      return {
        ...prev,
        teeth: newTeeth
      };
    });
  };

  const addTreatment = () => {
    if (currentTreatment.type && currentTreatment.teeth.length > 0) {
      setFormData(prev => ({
        ...prev,
        treatments: [...prev.treatments, { ...currentTreatment }]
      }));
      setCurrentTreatment({
        teeth: [],
        type: '',
        diagnosis: '',
        procedure: '',
        materials: ''
      });
    }
  };

  const removeTreatment = (index) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment data:', formData);
    // Here you would typically make an API call to save the appointment
    navigate(`/patient/${id}/appointments`);
  };

  const renderField = (label, name, type = 'text', required = false) => {
    return (
      <div className="form-group">
        <label>{label}{required && '*'}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
            placeholder={`Inserir ${label.toLowerCase()}...`}
          />
        ) : type === 'checkbox' ? (
          <input
            type="checkbox"
            name={name}
            checked={formData[name]}
            onChange={handleChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={required}
          />
        )}
      </div>
    );
  };

  return (
    <div className="new-appointment-container">
      <div className="back-link">
        <span className="arrow">←</span>
        <a onClick={() => navigate(`/patient/${id}/appointments`)}>
          Voltar às Consultas
        </a>
      </div>

      <div className="appointment-header">
        <h2>Nova Consulta</h2>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        <section className="form-section">
          <h3>Informações Básicas</h3>
          <div className="form-grid">
            {renderField('Data', 'date', 'date', true)}
            {renderField('Hora', 'time', 'time', true)}
            <div className="form-group">
              <label>Status*</label>
              <select 
                name="status" 
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Agendado">Agendado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Tratamentos</h3>
          <div className="treatments-list">
            {formData.treatments.map((treatment, index) => (
              <div key={index} className="treatment-item">
                <div className="treatment-header">
                  <h4>{treatment.type}</h4>
                  <button 
                    type="button" 
                    className="remove-treatment-btn"
                    onClick={() => removeTreatment(index)}
                  >
                    ×
                  </button>
                </div>
                <p>Dentes: {treatment.teeth.join(', ')}</p>
                <p>Diagnóstico: {treatment.diagnosis}</p>
              </div>
            ))}
          </div>

          <div className="add-treatment-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Tipo de Tratamento*</label>
                <select 
                  name="type" 
                  value={currentTreatment.type}
                  onChange={handleTreatmentChange}
                  required
                >
                  <option value="">Selecionar tratamento</option>
                  {treatmentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group full-width">
                <label>Dentes*</label>
                <div className="teeth-selection-container">
                  <button
                    type="button"
                    className={`general-tooth-button ${currentTreatment.teeth.includes('Geral') ? 'selected' : ''}`}
                    onClick={() => {
                      setCurrentTreatment(prev => ({
                        ...prev,
                        teeth: prev.teeth.includes('Geral') ? [] : ['Geral']
                      }));
                    }}
                  >
                    Geral (Boca Completa)
                  </button>
                  
                  <div className="teeth-quadrants">
                    {/* First Quadrant - Top Left */}
                    <div className="quadrant-container">
                      <div className="quadrant-label">1º Quadrante</div>
                      <div className="quadrant first">
                        {['11', '12', '13', '14', '15', '16', '17', '18'].map(tooth => (
                          <ToothShape
                            key={tooth}
                            number={tooth}
                            selected={currentTreatment.teeth.includes(tooth)}
                            onClick={() => handleTeethSelection(tooth)}
                            disabled={currentTreatment.teeth.includes('Geral')}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Second Quadrant - Top Right */}
                    <div className="quadrant-container">
                      <div className="quadrant-label">2º Quadrante</div>
                      <div className="quadrant second">
                        {['21', '22', '23', '24', '25', '26', '27', '28'].map(tooth => (
                          <ToothShape
                            key={tooth}
                            number={tooth}
                            selected={currentTreatment.teeth.includes(tooth)}
                            onClick={() => handleTeethSelection(tooth)}
                            disabled={currentTreatment.teeth.includes('Geral')}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Fourth Quadrant - Bottom Left */}
                    <div className="quadrant-container">
                      <div className="quadrant-label">4º Quadrante</div>
                      <div className="quadrant fourth">
                        {['41', '42', '43', '44', '45', '46', '47', '48'].map(tooth => (
                          <ToothShape
                            key={tooth}
                            number={tooth}
                            selected={currentTreatment.teeth.includes(tooth)}
                            onClick={() => handleTeethSelection(tooth)}
                            disabled={currentTreatment.teeth.includes('Geral')}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Third Quadrant - Bottom Right */}
                    <div className="quadrant-container">
                      <div className="quadrant-label">3º Quadrante</div>
                      <div className="quadrant third">
                        {['31', '32', '33', '34', '35', '36', '37', '38'].map(tooth => (
                          <ToothShape
                            key={tooth}
                            number={tooth}
                            selected={currentTreatment.teeth.includes(tooth)}
                            onClick={() => handleTeethSelection(tooth)}
                            disabled={currentTreatment.teeth.includes('Geral')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {renderField('Diagnóstico', 'diagnosis', 'textarea', true)}
              {renderField('Procedimento', 'procedure', 'textarea', true)}
              {renderField('Materiais Utilizados', 'materials', 'textarea')}
            </div>
            <button 
              type="button" 
              className="add-treatment-btn"
              onClick={addTreatment}
            >
              Adicionar Tratamento
            </button>
          </div>
        </section>

        <section className="form-section">
          <h3>Observações Clínicas</h3>
          <div className="form-grid">
            {renderField('Notas', 'notes', 'textarea')}
            {renderField('Recomendações', 'recommendations', 'textarea')}
            {renderField('Prescrições', 'prescriptions', 'textarea')}
            {renderField('Complicações', 'complications', 'textarea')}
          </div>
        </section>

        <section className="form-section">
          <h3>Acompanhamento</h3>
          <div className="form-grid">
            {renderField('Próxima Consulta', 'nextAppointment', 'date')}
            <div className="form-group checkbox-group">
              {renderField('Raio-X Realizado', 'xrayTaken', 'checkbox')}
              {renderField('Necessita Acompanhamento', 'followUpNeeded', 'checkbox')}
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate(`/patient/${id}/appointments`)}
          >
            Cancelar
          </button>
          <button type="submit" className="submit-btn">
            Criar Consulta
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewAppointment;