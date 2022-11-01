// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const dateM = require('../modules/datetime');
const Record = require('../models/Record');


const JWT_SECRET = process.env.JWT_SECRET;
const ADDRESS_SECRET = process.env.ADDRESS_SECRET;

router.route('/:id')
.get(fetchuser, async (req, res)=>{
    const uri = req.params.id.replaceAll("slash", "/");
    const uriO = md5(dateM()+ADDRESS_SECRET);
    const passwordCompare =  uri == uriO;
        if(!passwordCompare){
            return res.status(400).json({error: "Sorry, Code Expired!"})
        }

    try{
        let success = false;

        const { location } = req.body;

        let record = await Record.create( {
            user: req.user.id,
            location: location
        })

        success = true;
        res.json({success});

    }catch(error){
        console.log(error);
        res.json({success: false, error: "Somthing went wrong!"})
    }
})


module.exports = router;