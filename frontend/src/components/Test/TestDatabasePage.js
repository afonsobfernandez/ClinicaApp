import React, { useState } from 'react';
import './TestDatabasePage.css';

const TestDatabasePage = () => {
  const [connectionStatus, setConnectionStatus] = useState('Not tested');
  const [testData, setTestData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [treatments, setTreatments] = useState(null);
  const [treatmentsError, setTreatmentsError] = useState(null);
  const [loadingTreatments, setLoadingTreatments] = useState(false);
  
  // New state for form
  const [newTreatment, setNewTreatment] = useState({
    nome_tratamento: '',
    tipo_tratamento: '',
    descricao: ''
  });
  const [insertStatus, setInsertStatus] = useState(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/test');
      const data = await response.json();
      
      if (response.ok) {
        setConnectionStatus('Connected successfully');
        setTestData(data);
      } else {
        throw new Error('Failed to connect to the database');
      }
    } catch (err) {
      setConnectionStatus('Connection failed');
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTreatments = async () => {
    setLoadingTreatments(true);
    setTreatmentsError(null);
    
    try {
      console.log('Attempting to fetch treatments...'); // Debug log
      const response = await fetch('http://localhost:3001/api/treatments');
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Debug log
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched treatments data:', data); // Debug log
      setTreatments(data);
    } catch (err) {
      console.error('Error details:', err); // Debug log
      setTreatmentsError(err.message);
    } finally {
      setLoadingTreatments(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInsertStatus(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/treatments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTreatment)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add treatment');
      }

      const result = await response.json();
      setInsertStatus('Treatment added successfully!');
      
      // Clear form
      setNewTreatment({
        nome_tratamento: '',
        tipo_tratamento: '',
        descricao: ''
      });
      
      // Refresh treatments list
      fetchTreatments();
    } catch (err) {
      setInsertStatus(`Error: ${err.message}`);
      console.error('Error inserting treatment:', err);
    }
  };

  return (
    <div className="test-database-container">
      <h1>Database Connection Test</h1>
      
      {/* Connection Test Section */}
      <div className={`test-status ${connectionStatus === 'Connected successfully' ? 'success' : 
                                   connectionStatus === 'Connection failed' ? 'error' : ''}`}>
        <h2>Connection Status: {connectionStatus}</h2>
        {isLoading && <div className="spinner"></div>}
        {error && <p className="error-message">Error: {error}</p>}
      </div>

      <button 
        className="test-button" 
        onClick={testConnection}
        disabled={isLoading}
      >
        {isLoading ? 'Testing...' : 'Test Connection'}
      </button>

      {testData && (
        <div className="data-display">
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(testData, null, 2)}</pre>
        </div>
      )}

      {/* New Treatment Form */}
      <div className="new-treatment-section">
        <h2>Add New Treatment</h2>
        <form onSubmit={handleSubmit} className="treatment-form">
          <div className="form-group">
            <label htmlFor="nome_tratamento">Treatment Name:</label>
            <input
              type="text"
              id="nome_tratamento"
              name="nome_tratamento"
              value={newTreatment.nome_tratamento}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo_tratamento">Treatment Type:</label>
            <input
              type="text"
              id="tipo_tratamento"
              name="tipo_tratamento"
              value={newTreatment.tipo_tratamento}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Description:</label>
            <textarea
              id="descricao"
              name="descricao"
              value={newTreatment.descricao}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Treatment
          </button>
        </form>

        {insertStatus && (
          <div className={`insert-status ${insertStatus.includes('Error') ? 'error' : 'success'}`}>
            {insertStatus}
          </div>
        )}
      </div>

      {/* Treatments Display Section */}
      <div className="treatments-section">
        <h2>Treatments Data</h2>
        <button 
          className="fetch-button"
          onClick={fetchTreatments}
          disabled={loadingTreatments}
        >
          {loadingTreatments ? 'Loading Treatments...' : 'Fetch Treatments'}
        </button>

        {loadingTreatments && <div className="spinner"></div>}
        
        {treatmentsError && (
          <div className="error-message">
            <p>Error fetching treatments: {treatmentsError}</p>
          </div>
        )}

        {treatments && (
          <div className="treatments-display">
            <h3>Treatments List:</h3>
            <table className="treatments-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment) => (
                  <tr key={treatment.tratamento_id}>
                    <td>{treatment.tratamento_id}</td>
                    <td>{treatment.nome_tratamento}</td>
                    <td>{treatment.tipo_tratamento}</td>
                    <td>{treatment.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDatabasePage;