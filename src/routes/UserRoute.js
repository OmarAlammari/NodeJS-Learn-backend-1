const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userValidator = require('../middleware/UsersValidatorMW');
const { User } = require('../models/UserModelDB');

// Registration
router.post('/', userValidator, async (req, res, nxt) => {
    try {
        // check already exists
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user)
            return res.status(400).send('User already Registered!!');

        // create new user to be add to DB
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(req.body.password, salt);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        await user.save();

        // if (!config.get("jwtsec"))
        //     return res.status(500).send('Request can not be full filled.. token is not defined');

        const token = user.genAuthToken();

        // send res 
        res.header("x-auth-token", token);
        res.status(200).send('Ok');

    } catch (err) {
        // res.status(400).send('Bad Request.. ');
        nxt(err);
    }
});


module.exports = router;
