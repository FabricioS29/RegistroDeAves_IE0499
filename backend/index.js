// Importart libraries 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

// Use methods libs
const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


// Database setup
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log("Coneccion de base de datos exitosa!")})

// Routes setup
app.use('/api/bird', require('./routes/bird'));
app.use('/api/auth', require('./routes/auth'));

// Listen to port
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor de aves MERN esta siendo ejecutado en el puerto ${port}`);
})