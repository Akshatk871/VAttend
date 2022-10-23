var QRCode = require("qrcode");

const router = expess.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var currentdate, datetime;

function generateQR() {
  currentdate = new Date();
  datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  console.log(datetime);
  const uri = "http://localhost:9000/" + datetime;
  QRCode.toString(uri, { type: "terminal" }, function (err, url) {
    console.log(url);
  });
}

function qrt() {
  setInterval(generateQR, 10000);
}
module.exports = qrt;
