// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const User = require('../models/User');


const JWT_SECRET = process.env.JWT_SECRET;

router.route('/fetchallusers')
.get(fetchuser, async(req, res)=>{
    try{
        let success = false;
        const user = await User.findById(req.user.id);

        // Checking if user exists
        if(!user) res.status(400).json({success, message: "Not Authorized!"});

        const isAdmin = user.admin;

        // Checking if found user is a Admin
        if(!isAdmin)res.status(400).json({success, message: "Not Authorized!"});

        const users = await User.find({},'employee_id name admin');
        res.json({users});
    }catch(error){
        console.log(error);
        res.json({success: false, message: "Internal Server Error!"});
    }
})





module.exports = router;