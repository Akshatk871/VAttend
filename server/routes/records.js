// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const fetchuser = require("../middleware/fetchuser");
const Record = require("../models/Record");

router.route("/fetchallrecords").get(fetchuser, async (req, res) => {
  // This function is responsible to add 5hrs and 30 mins so that attendence made on heroku is controlled
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  try {
    var records = await Record.find(
      { user: req.user.id },
      "date distance present location"
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
