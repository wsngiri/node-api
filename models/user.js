var moongose = require('mongoose');
var Schema = moongose.Schema;

var userSchema = new Schema({
    name: String,
    password: String
})

module.exports = moongose.model('User', userSchema);