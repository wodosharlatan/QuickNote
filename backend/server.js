const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const axios = require('axios');

// Add env variables
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');

// Sites
app.use('/users', userRoute);
app.use('/login', loginRoute);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} !`);
});

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true})
