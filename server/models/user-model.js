const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    password: String,
    address: String,
    age: Number,
    phone: String,
    orders: [{
        id: String,
        name: String,
        things: Array,
        cost: String,
        address: String,
        phone: String
    }]
});

module.exports = mongoose.model('User', UserSchema);