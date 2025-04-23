// Dotenv init
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./db/connect');
const {sanitizeMiddleware} = require('./tools/tools');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
app.use(express.json());
//app.set('trust proxy', true);

connectDB();

app.use(express.json());

// Sanitize incoming data
app.use(sanitizeMiddleware);

// User
app.use('/api/user', userRoutes);

// Authorization
app.use('/api/auth', authRoutes);

// Item
app.use('/api/item', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));