const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../ghl_plugin.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database error:', err.message);
  } else {
    console.log('✓ Connected to SQLite');
    initTables();
  }
});

function initTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Table creation error:', err);
      else console.log('✓ Settings table ready');
    });

    db.run(`
      INSERT OR IGNORE INTO settings (key, value)
      VALUES ('round_robin_last_assigned_index', '0')
    `);
  });
}

module.exports = db;
