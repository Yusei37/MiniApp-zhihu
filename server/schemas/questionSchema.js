var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var questionSchema = new Schema({
    title: String,
    description: String,
    author: String,
    time: {
        type: Date,
        default: Date.now
    },
    follow: Array,
    reply: [{
        name: String,
        image: String,
        time: {
            type: Date,
            default: Date.now
        },
        content: String,
        up: Array,
        down: Array,
        thank: Array,
        collect: Array,
        comment: Array
    }]
});
module.exports = questionSchema;