require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/setup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://app.gohighlevel.com', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Routes (to be added in Phase 2)
app.get('/api/availability', (req, res) => {
  res.json({ message: 'Not implemented yet (Phase 2)' });
});

app.post('/api/book', (req, res) => {
  res.json({ message: 'Not implemented yet (Phase 2)' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
