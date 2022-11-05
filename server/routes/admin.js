// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require('../models/User');
const Record = require('../models/Record');


router.route('/fetchallusers')
.get(fetchuser, async(req, res)=>{
    try{
        let success = false;
        const user = await User.findById(req.user.id);

        // Checking if user exists
        if(!user) {
           return res.status(400).json({success, error: "Not Authorized!"});
        }

        const isAdmin = user.admin;

        // Checking if found user is a Admin
        if(!isAdmin) {
            return res.status(400).json({success, error: "Not Authorized!"});
        }

        const users = await User.find({},'employee_id name admin date');
        
        success = true;
        res.json({success, users});
    }catch(error){
        console.log(error);
        res.json({success: false, error: "Internal Server Error!"});
    }
})


router.route("/fetchallrecords")
.get(async (req, res)=>{

    try {
        const records = await Record.find({});
        res.json(records);
      } catch (error) {
        console.log(error);
        res.json({ error: "Something Went Wrong!" });
      }
    
})


router.route("/fetchuser")
.post(fetchuser, async (req, res)=>{
    try{
        let success = false;
        const user = await User.findById(req.user.id);

        // Checking if user exists
        if(!user) {
           return res.status(400).json({success, error: "Not Authorized!"});
        }

        const isAdmin = user.admin;

        // Checking if found user is a Admin
        if(!isAdmin) {
            return res.status(400).json({success, error: "Not Authorized!"});
        }

        let finduser = await User.findById(req.body.id, 'name employee_id date admin');

        if(!finduser){
            return res.status(400).json({error: "User Not Found!"});
        }

        let date = finduser.date.toDateString();
        let time = finduser.date.toTimeString();

        const details = {
            name: finduser.name,
            employee_id: finduser.employee_id,
            admin: finduser.admin,
            date: date,
            time: time
        }
        success = true;
        res.json({success, details});
    }catch(error){
        console.log(error);
        res.json({success: false, error: "Internal Server Error!"});
    }
})


router.route("/fetchuserrecords").post(fetchuser, async (req, res) => {
    // This function is responsible to add 5hrs and 30 mins so that attendence made on heroku is controlled
    function addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
    try {

        // Verification if the request requested is by a admin
        let success = false;
        const user = await User.findById(req.user.id);

        // Checking if user exists
        if(!user) {
           return res.status(400).json({success, error: "Not Authorized!"});
        }

        const isAdmin = user.admin;

        // Checking if found user is a Admin
        if(!isAdmin) {
            return res.status(400).json({success, error: "Not Authorized!"});
        }


      var records = await Record.find(
        { user: req.body.id },
        "date distance present"
      );
  
      // Below Function Fixes time error i.e. 5hrs and 30 mins
      records.map((record) => {
        record.date = addMinutes(record.date, 330);
      });
      res.json({ success: true, records });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error: "Something Went Wrong!" });
    }
  });


module.exports = router;