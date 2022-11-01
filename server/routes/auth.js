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

// Creating a user using POST: (/api/auth/createuser) , Doesn't require auth (or no login required);
router.route('/createuser')
.post([
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('password').isLength({min: 6})
], async (req, res)=>{

    // Validating if email/password/name is acceptable
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    // Saving req data into a variable
    let data = req.body;

    try{
    // Checking if user already exists
    let user = await User.findOne({employee_id: data.employee_id});
    if(user){
        res.status(400).json({error: 'Sorry, a user with this employee id already exists!'});
        return null;
    }

    // Using bcrypt to generate a secured password

    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Creating the user
    user = await User.create({
        name: data.name,
        password: securedPassword,
        employee_id: data.employee_id
    })

    const returnData = {
        user: {
            id: user.id
        }
    }

    const autotoken = jwt.sign(returnData, JWT_SECRET);

    res.json({msg: 'Account Created Successfully!!', autotoken});
    } catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});

/*


╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╭━━━╮
┃╭━╮┃╱╱╱╱╭╯╰╮╱╱╱┃╭━╮┃
┃╰━╯┣━━┳╮┣╮╭╋━━╮╰╯╭╯┃
┃╭╮╭┫╭╮┃┃┃┃┃┃┃━┫╭━╯╭╯
┃┃┃╰┫╰╯┃╰╯┃╰┫┃━┫┃┃╰━╮
╰╯╰━┻━━┻━━┻━┻━━╯╰━━━╯

*/

// Authenticate a user using POST: (/api/auth/login) , Doesn't require auth (or no login required);

router.route('/login')
.post([
    body('employee_id', 'Enter a employeeID').exists(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{
    // Validating if employeeid/password/name is acceptable
    const errors = validationResult(req);
    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {employee_id, password} = req.body;
    

    try{
        let user = await User.findOne({employee_id}).exec();

        if(!user){
            return res.status(400).json({error: "Please, login with correct credentials"});
        }

        const passwordCompare =  await bcrypt.compare(password.toString(), user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please, login with correct credentials"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }

})



module.exports = router;