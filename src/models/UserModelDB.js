const mongoose = require('mongoose');
const valid = require('validator');
const jwt = require('jsonwebtoken');
// var config = require('config');
require('dotenv').config();

//1)Create Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val) => valid.isEmail(val), ///.+\@.+\..+/.test(val)
            message: '{VALUE} is not valid email'
        }
    },
    isAdmin: {
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

userSchema.methods.genAuthToken = function () {
    const token = jwt.sign({
        userId: this._id,
        adminRole: this.isAdmin
    },
        process.env.JWT_SECRET_KEY
    );
    return token;
}
// config.get("jwtsec")

// UserSchema.method("genAuthToken", function () {
//     const token = jwt.sign(
//         { userid: this._id },
//         config.get("jwtsec"));
//     return token;
// });

//2)Create Model
// const User = mongoose.model('Users', UserSchema);


// module.exports = User;
exports.User = mongoose.model('Users', userSchema);


