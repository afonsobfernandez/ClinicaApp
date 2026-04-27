const router = require('express').Router();
const db = require('../db');

// Get all appointments for a patient
router.get('/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const result = await db.query(
      'SELECT * FROM consultas WHERE paciente_id = $1',
      [patientId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, date, treatments } = req.body;
    const result = await db.query(
      'INSERT INTO appointments (patient_id, date, treatments) VALUES ($1, $2, $3) RETURNING *',
      [patientId, date, treatments]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;