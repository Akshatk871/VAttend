require('dotenv').config();

const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

fetchdevice = (req, res, next)=>{
    
    // Get the user from auth tokein and extract id and then add it to the req object

    const token = req.header('device-token');

    if(!token){
        res.status(401).send({error: "Token Validation Error!"})
    }

    try{
    req.device = token;
    next();
    }catch(error){
        res.status(401).send({error: "Token Validation Error!"})
    }
}

module.exports = fetchdevice;