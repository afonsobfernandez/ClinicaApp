const router = require('express').Router();
const db = require('../db');

// Get all treatments
router.get('/', async (req, res) => {
  try {
    console.log('Fetching treatments...');
    const result = await db.query('SELECT * FROM tratamentos ORDER BY tratamento_id');
    console.log('Treatments fetched:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching treatments:', err);
    res.status(500).json({ 
      error: 'Failed to fetch treatments',
      details: err.message 
    });
  }
});

// Add new treatment
router.post('/', async (req, res) => {
  try {
    const { nome_tratamento, tipo_tratamento, descricao } = req.body;
    
    // Validate input
    if (!nome_tratamento || !tipo_tratamento || !descricao) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    const result = await db.query(
      'INSERT INTO tratamentos (nome_tratamento, tipo_tratamento, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome_tratamento, tipo_tratamento, descricao]
    );

    console.log('Treatment added:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding treatment:', err);
    res.status(500).json({ 
      error: 'Failed to add treatment',
      details: err.message 
    });
  }
});

module.exports = router;