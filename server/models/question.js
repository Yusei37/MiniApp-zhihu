var mongoose = require('mongoose');
var questionSchema = require('../schemas/questionSchema');
//创建model，这个地方的live对应mongodb数据库中live的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var question = mongoose.model('question',questionSchema);
module.exports = question;