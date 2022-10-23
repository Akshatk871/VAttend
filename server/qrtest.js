var QRCode = require('qrcode')


const qr = ()=>{QRCode.toString('https://www.google.com',{type:'terminal'}, function (err, url) {
  console.log(url)
})}

module.exports = qr;