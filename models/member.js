const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    department: {
        type: String
    },
    isNotified: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('member', memberSchema);