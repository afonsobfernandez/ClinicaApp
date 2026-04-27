
import React from 'react';
import './LegalInfo.css';

function LegalInfo({ patient }) {
  if (!patient) return <div>No patient selected</div>;

  return (
    <div className="legal-info">
      <h2>Informação Legal</h2>

      <div className="info-section">
        <h3>Informação Pessoal</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Nome Completo</label>
            <input type="text" defaultValue={patient.name} />
          </div>
          <div className="info-item">
            <label>Data de Nascimento</label>
            <input type="date" defaultValue="1990-01-01" />
          </div>
          <div className="info-item">
            <label>Género</label>
            <select 
              defaultValue={patient.gender || ''} 
              className="select-input"
            >
              <option value="" disabled>Selecione o género</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao_especificado">Prefiro não dizer</option>
            </select>
          </div>
          <div className="info-item">
            <label>Nº de Identificação</label>
            <input type="text" defaultValue="123456789" />
          </div>
          <div className="info-item">
            <label>Nº de Identificação Fiscal</label>
            <input type="text" defaultValue={patient.name} />
          </div>
          <div className="info-item">
            <label>Nº de Utente de Saúde</label>
            <input type="text" defaultValue={patient.name} />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Contacto</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Nº de Telemóvel</label>
            <input type="tel" defaultValue={patient.phone} />
          </div>
          <div className="info-item">
            <label>Email</label>
            <input type="email" defaultValue={patient.email} />
          </div>
          <div className="info-item">
            <label>Morada</label>
            <input type="text" defaultValue="123 Main St" />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Contacto de Emergência</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>Nome</label>
            <input type="text" defaultValue="Emergency Contact Name" />
          </div>
          <div className="info-item">
            <label>Grau de Parentesco</label>
            <input type="text" defaultValue="Spouse" />
          </div>
          <div className="info-item">
            <label>Nº de Telemóvel</label>
            <input type="tel" defaultValue="123-456-7890" />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>Informação de Seguro</h3>
        <div className="info-grid">
        <div className="info-item">
            <label>Provedor de Seguro</label>
            <select 
              defaultValue={patient.gender || ''} 
              className="select-input"
            >
              <option value="" disabled>Selecione o Seguro</option>
              <option value="médis">Médis</option>
              <option value="advancecare">Advancecare</option>
              <option value="multicare">Multicare</option>
            </select>
          </div>
          <div className="info-item">
            <label>Nº da Apólice</label>
            <input type="text" defaultValue="POL123456" />
          </div>
          <div className="info-item">
            <label>Nº do Grupo</label>
            <input type="text" defaultValue="GRP789012" />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="save-button">Guardar Alterações</button>
      </div>
    </div>
  );
}

export default LegalInfo;