var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//创建Schema
var userSchema = new Schema({
    nickName: String,
    avatarUrl: String,
    follow: [{
        nickName: String,
        avatarUrl: String
    }],
    collect: Array,
    write: Array,
    live: Array
});
module.exports = userSchema;