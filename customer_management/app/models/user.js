var mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema({
    name: { type : String, 
      minlength: 4,
      maxlength: 20,
      message :'String length should be within 4 to 20 Characters' },
  
    email: { type : String, 
      minlength: 4,
      maxlength: 20,
      message :'String length should be within 4 to 20 Characters' },
    password: { type : String, 
      minlength: 4,
      maxlength: 20,
      message :'Password length should be within 8 to 20 Characters' },
    created_at: {
        type: Date,
        default: Date.now(),
    },
  }, { collection: 'user' });

  module.exports = User = mongoose.model("user", UserSchema);