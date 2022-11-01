// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const Record = require('../models/Record');


const JWT_SECRET = process.env.JWT_SECRET;

router.route("/fetchallrecords")
.get(fetchuser, async (req, res)=>{

    try {
        const records = await Record.find({ user: req.user.id });
        res.json(records);
      } catch (error) {
        console.log(error);
        res.json({ error: "Something Went Wrong!" });
      }
    
})





module.exports = router;