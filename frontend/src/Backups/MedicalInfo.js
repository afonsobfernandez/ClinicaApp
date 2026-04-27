import React from 'react';
import './MedicalInfo.css';

function MedicalInfo({ patient }) {
  if (!patient) return <div>No patient selected</div>;

  return (
    <div className="medical-info">
      <h2>Informação Médica</h2>
      
      <div className="info-section">
        <h3>Informação Geral</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Idade</label>
            <input type="text" defaultValue="25" />
          </div>
          <div className="info-item">
            <label>Altura</label>
            <input type="text" defaultValue="175 cm" />
          </div>
          <div className="info-item">
            <label>Peso</label>
            <input type="text" defaultValue="70 kg" />
          </div>
          <div className="info-item">
            <label>Tipo Sanguíneo</label>
            <select 
              defaultValue={patient.gender || ''} 
              className="select-input"
            >
              <option value="" disabled>Selecione o tipo sanguíneo</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Histórico Médico</h3>
        <div className="medical-conditions">
          <label>Condições Existentes</label>
          <textarea 
            defaultValue="Nenhuma condição médica significativa"
            rows="3"
          />
        </div>
        <div className="medical-conditions">
          <label>Alergias</label>
          <textarea 
            defaultValue="Penicilina"
            rows="3"
          />
        </div>
        <div className="medical-conditions">
          <label>Condições Existentes de Familiares</label>
          <textarea 
            defaultValue="Nenhuma condição médica significativa"
            rows="3"
          />
        </div>
      </div>

      <div className="info-section">
        <h3>Medicação Recorrente</h3>
        <table className="medications-table">
          <thead>
            <tr>
              <th>Medicação</th>
              <th>Dosagem</th>
              <th>Frequência</th>
              <th>Data de Início</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" defaultValue="Medication 1" />
              </td>
              <td>
                <input type="text" defaultValue="10mg" />
              </td>
              <td>
                <input type="text" defaultValue="Once daily" />
              </td>
              <td>
                <input type="date" defaultValue="2024-01-01" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        <button className="save-button">Guardar Alterações</button>
      </div>
    </div>
  );
}

export default MedicalInfo;