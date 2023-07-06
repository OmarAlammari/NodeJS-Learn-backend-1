const mongoose = require('mongoose');
const valid = require('validator');

//1)Create Schema
const UserSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => valid.isEmail(val), ///.+\@.+\..+/.test(val)
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

//2)Create Model
const User = mongoose.model('Users', UserSchema);

module.exports = User;

