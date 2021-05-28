const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        maxLength: 255,
        
      },
    exp:{
        type:Number,
    },
    email: {type: String, required: true},
    password: {type: String, required: true}
});
User.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
  };
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);  
  };
  
module.exports = mongoose.model('User', User);