const express = require('express');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

connectDB();

// User
app.use('/api/user', userRoutes);

// Authorization
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));