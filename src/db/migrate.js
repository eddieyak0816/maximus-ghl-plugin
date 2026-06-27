require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./connection');

async function migrate() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    const connection = await pool.getConnection();
    console.log('✓ Connected to MySQL');

    // Split SQL into individual statements and execute
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      try {
        await connection.query(statement);
        console.log('✓', statement.split('\n')[0].substring(0, 60) + '...');
      } catch (error) {
        console.error('✗ Error executing statement:', error.message);
        throw error;
      }
    }

    connection.release();
    console.log('\n✅ Database migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
