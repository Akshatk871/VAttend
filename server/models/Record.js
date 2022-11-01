const mongoose = require('mongoose');


const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {type: Date, default: Date.now},
    location: { type: [Number], index: { type: '2dsphere', sparse: true}},
    distance: {type: Number},
    present: {type: Boolean}
});

module.exports = mongoose.model('record', recordSchema);