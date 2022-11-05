// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const User = require("../models/User");
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

/*

╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╱╭╮
┃╭━╮┃╱╱╱╱╭╯╰╮╱╱╱╭╯┃
┃╰━╯┣━━┳╮┣╮╭╋━━╮╰╮┃
┃╭╮╭┫╭╮┃┃┃┃┃┃┃━┫╱┃┃
┃┃┃╰┫╰╯┃╰╯┃╰┫┃━┫╭╯╰╮
╰╯╰━┻━━┻━━┻━┻━━╯╰━━╯

*/

// Authenticate a user and get USER DETAILS GET: (/api/profile) , Doesn't require auth (or no login required);

router.route('/')
.get(fetchuser, async (req, res)=>{
    let success = false;    

    try{
        let user = await User.findById(req.user.id, 'name employee_id date admin');

        if(!user){
            return res.status(400).json({error: "User Not Found!"});
        }

        let date = user.date.toDateString();
        let time = user.date.toTimeString();

        const details = {
            name: user.name,
            employee_id: user.employee_id,
            admin: user.admin,
            date: date,
            time: time
        }


        success = true;
        res.json({success, details});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }

})


/*


╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╭━━━╮
┃╭━╮┃╱╱╱╱╭╯╰╮╱╱╱┃╭━╮┃
┃╰━╯┣━━┳╮┣╮╭╋━━╮╰╯╭╯┃
┃╭╮╭┫╭╮┃┃┃┃┃┃┃━┫╭━╯╭╯
┃┃┃╰┫╰╯┃╰╯┃╰┫┃━┫┃┃╰━╮
╰╯╰━┻━━┻━━┻━┻━━╯╰━━━╯

*/


router.route('/updatepassword')
.post([
    body('oldpassword', 'Password cannot be blank').exists(),
    body('newpassword', 'Password cannot be blank').exists()
],fetchuser, async (req, res)=>{

    // Validating if employeeid/password/name is acceptable
    const errors = validationResult(req);
    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { oldpassword, newpassword } = req.body;


    try{
        let user = await User.findById(req.user.id).exec();

        if(!user){
            return res.status(400).json({error: "Please, Invalid Credentials"});
        }

        const passwordCompare =  await bcrypt.compare(oldpassword.toString(), user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please, Invalid Credentials"})
        }

        // Crating a salt from bcrypt
        const securedPassword = await bcrypt.hash(newpassword.toString(), 10);

        // Updating the Password using above retrieved user
        user.password = securedPassword;
        await user.save();

        success = true;
        res.json({success, message: "Password Updated Successfully!!"});


    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }

})


module.exports = router;