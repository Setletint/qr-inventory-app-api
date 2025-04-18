const express = require('express');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));