const { Client } = require('pg');

module.exports = async (req, res) => {
  const client = new Client({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to Supabase database');

    // Example query to test connection
    const result = await client.query('SELECT NOW()');
    console.log('Query result', result.rows);

    res
      .status(200)
      .json({ message: 'Connection successful', data: result.rows });
  } catch (error) {
    console.error('Connection error', error.stack);
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  } finally {
    await client.end();
  }
};
