const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to DB
require('dotenv').config();
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.log(err);
    console.log('connected to DB');
});

// Middleware
app.use(express.json());

// Import Routes Middleware
app.use('/api/user/', require('./routes/auth'));
app.use('/api/posts/', require('./routes/post'));

app.listen(3000, () => { console.log('Server started on port 3000....'); })