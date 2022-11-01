const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    employee_id: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    admin: {type: Boolean, required: true}
});

module.exports = mongoose.model('user', userSchema);