var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var liveSchema = new Schema({
    name: String,
    image: String,
    title: String,
    price: Number,
    time: String
});
module.exports = liveSchema;