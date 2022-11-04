// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const md5 = require('md5');
const fetchuser = require("../middleware/fetchuser");
const dateM = require('../modules/datetime');
const Record = require('../models/Record');
const User = require('../models/User');
const distance = require('../modules/distance');


const ADD_REACT = process.env.ADD_REACT;
const ADDRESS_SECRET = process.env.ADDRESS_SECRET;

const office_location = [process.env.OFFICE_LATITUDE, process.env.OFFICE_LONGITUDE];
const minimum_distance = [process.env.MINIMUM_DISTANCE]

router.route('/:id')
.post(fetchuser, async (req, res)=>{
    const uri = req.params.id.replaceAll("slash", "/");
    const uriO = md5(dateM()+ADDRESS_SECRET);
    const passwordCompare =  uri == uriO;
        if(!passwordCompare){
            return res.status(400).json({success: false,error: "Sorry, Code Expired!"})
        }

    try{
        let success = false;

        const { location } = req.body;
        
        const dist = distance(office_location[0], office_location[1], location[0], location[1]);
        
        let present = false;

        if(dist<minimum_distance) present = true; 

        let record = await Record.create( {
            user: req.user.id,
            location: location,
            distance: dist,
            present: present
        })

        const users = await User.findById(req.user.id,'employee_id name');
        const event = new Date();
        const nowTime = event.toTimeString().split(" ")[0];
        success = true;

        if(present) res.json({success, present: true, distance: dist, name: users.name, employee_id: users.employee_id, time: nowTime});
        else res.json({success, present: false, distance: dist, name: users.name, employee_id: users.employee_id, time: nowTime});

    }catch(error){
        console.log(error);
        res.json({success: false, error: "Somthing went wrong!"})
    }
})
.get((req, res)=>{
    res.redirect(ADD_REACT+'/scanned/');
})


module.exports = router;