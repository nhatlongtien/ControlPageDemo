const mongoose = require('mongoose');
var schemaMarvel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    level: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('Marvel', schemaMarvel);