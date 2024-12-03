const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');

const app = express();
const port = 3001;

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a strong secret key in production

// Middleware
app.use(bodyParser.json());

// Database connection
const db = new sqlite3.Database('../db/project/quantum.sqlite');

// Route to sign up a new user
app.post(
    '/api/signup',
    [
        body('username').isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {username, email, password} = req.body;

        // Check if the username or email is already in use
        db.get(
            'SELECT * FROM Users WHERE username = ? OR email = ?',
            [username, email],
            (err, user) => {
                if (err) return res.status(500).json({message: 'Database error'});
                if (user) return res.status(400).json({message: 'Username or email already in use'});

                // Hash the password
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) return res.status(500).json({message: 'Error hashing password'});

                    // Insert new user into the database
                    db.run(
                        'INSERT INTO Users (username, password_hash, email) VALUES (?, ?, ?)',
                        [username, hashedPassword, email],
                        function (err) {
                            if (err) return res.status(500).json({message: 'Error creating user'});
                            res.status(201).json({message: 'User created successfully'});
                        }
                    );
                });
            }
        );
    }
);

// Route to log in a user
app.post(
    '/api/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').exists().withMessage('Password is required'),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        // Find the user by email
        db.get('SELECT * FROM Users WHERE email = ?', [email], (err, user) => {
            if (err) return res.status(500).json({message: 'Database error'});
            if (!user) return res.status(401).json({message: 'Invalid email or password'});

            // Compare the provided password with the stored hash
            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                if (err) return res.status(500).json({message: 'Error comparing passwords'});
                if (!isMatch) return res.status(401).json({message: 'Invalid email or password'});

                // Generate a JWT
                const token = jwt.sign({userId: user.user_id}, JWT_SECRET, {expiresIn: '1h'});
                res.json({message: 'Login successful', token});
            });
        });
    }
);

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({message: 'Access token required'});

    // Remove the "Bearer " prefix if it exists
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;


    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Invalid or expired token'});
        req.user = user;
        next();
    });
}

// Example of a protected route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({message: `Hello, user ${req.user.userId}`});
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
