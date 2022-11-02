// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();

// imports for QR CODE generation
var QRCode = require("qrcode");
const md5 = require('md5');
const dateM = require('../modules/datetime');

const ADDRESS_SECRET = process.env.ADDRESS_SECRET;
const ADD_SERVER = process.env.ADD_SERVER;

var datetime;

router.route("/")
.get(async (req, res)=>{

    try {
        datetime = dateM();

      
        // Crating a salt from bcrypt
        var sURI = md5(datetime+ADDRESS_SECRET);
        const securedURI = sURI.replaceAll("/", "slash");
      
        const uri = ADD_SERVER+"/api/scan/" + securedURI;
        QRCode.toDataURL(uri, function (err, imgurl) {
          res.json({success: true, imgurl, uri});
        });
    
      } catch (error) {
        console.log(error);
        res.json({ error: "Something Went Wrong!" });
      }
    
})





module.exports = router;