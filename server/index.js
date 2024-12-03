const express = require('express');
const { db } = require('./db/connection');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const port = 3001;

// Middleware
app.use(express.json()); // Built-in Express method to parse JSON

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', authenticateToken, transactionRoutes);
app.use('/api/categories', authenticateToken, categoryRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});
