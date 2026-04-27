const { Connector } = require('@google-cloud/cloud-sql-connector');
const { Pool } = require('pg');
require('dotenv').config();

// Log the credentials path being used
console.log('Using credentials from:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

async function createPool() {
  const connector = new Connector();
  
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
    ipType: 'PUBLIC',
    credentials: require(process.env.GOOGLE_APPLICATION_CREDENTIALS) // Use the credentials here
  });

  const pool = new Pool({
    ...clientOpts,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 5,
  });

  return pool;
}

let pool;
async function getPool() {
  if (!pool) {
    pool = await createPool();
  }
  return pool;
}

module.exports = {
  query: async (text, params) => {
    const poolInstance = await getPool();
    try {
      const start = Date.now();
      const res = await poolInstance.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: res.rowCount });
      return res;
    } catch (err) {
      console.error('Query error:', err);
      throw err;
    }
  }
};