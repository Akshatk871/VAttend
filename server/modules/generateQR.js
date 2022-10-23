// Using enviroment variables to save data from being published online
require('dotenv').config();

var QRCode = require("qrcode");
const md5 = require('md5');
const dateM = require('./datetime');

const JWT_SECRET = process.env.JWT_SECRET;
const ADDRESS_SECRET = process.env.ADDRESS_SECRET;

var datetime;

async function generateQR() {

  datetime = dateM();
  console.log(datetime);

  // Crating a salt from bcrypt
  var sURI = md5(datetime+ADDRESS_SECRET);
  const securedURI = sURI.replaceAll("/", "slash");

  const uri = "http://192.168.29.73:9000/api/scan/" + securedURI;
  console.log(uri);
  QRCode.toString(uri, { type: "terminal" }, function (err, url) {
    console.log(url);
  });
}

function qrt() {
  setInterval(generateQR, 30000);
}
module.exports = qrt;
