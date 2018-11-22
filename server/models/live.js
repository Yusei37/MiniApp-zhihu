var mongoose = require('mongoose');
var liveSchema = require('../schemas/liveSchema');
//创建model，这个地方的live对应mongodb数据库中live的conllection。
//mongoose会自动改成复数，如模型名：xx―>xxes, kitten―>kittens, money还是money
var live = mongoose.model('live',liveSchema);
module.exports = live;