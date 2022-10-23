const connectToMongo = require('./database');
const express = require('express');

connectToMongo();


// The below lines of code are for testing the qrcode generator

// const qr = require('./qrtest');
// qr();


// setting up express server

const app = express();
const port = 9000;

// We use this middle ware to read request body params
app.use(express.json());

// Avialable Routes
//app.use('/api/auth', require('./routes/auth'));
//app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log("Server started at port: "+port);
})