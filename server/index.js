const connectToMongo = require('./database');
const express = require('express');
var cors = require('cors');

connectToMongo();

// setting up express server
const app = express();
const port = 9000;

app.use(cors());

// We use this middle ware to read request body params
app.use(express.json());

// Avialable Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scan', require('./routes/scan'));
app.use('/api/records', require('./routes/records'));
app.use('/api/users', require('./routes/users'));
app.use('/api/qr', require('./routes/qr'));

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})