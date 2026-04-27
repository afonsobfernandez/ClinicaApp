const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testQueries() {
  try {
    console.log('Testing Cloud SQL connection...');
    
    // Test basic connection
    const connectionTest = await pool.query('SELECT NOW()');
    console.log('Connected successfully at:', connectionTest.rows[0].now);

    // Test treatments table
    console.log('\nFetching treatments...');
    const treatments = await pool.query('SELECT * FROM tratamentos');
    console.log('Total treatments found:', treatments.rowCount);
    console.log('Treatments:', treatments.rows);

  } catch (err) {
    console.error('Connection error:', {
      message: err.message,
      code: err.code
    });
  } finally {
    await pool.end();
  }
}

testQueries();