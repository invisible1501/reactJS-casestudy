const mongoose = require('mongoose');

const GoodSchema = mongoose.Schema({
    id: Number,
    name: String,
    thumbnail: String,
    price: String,
    quantity: String
});

module.exports = mongoose.model('Good', GoodSchema);