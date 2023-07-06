const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const authValidator = require('../middleware/authValidatorMW');
const { User } = require('../models/UserModelDB');
// const User = require('../models/UserModelDB');

// Registration
router.post('/', authValidator, async (req, res) => {

    try {
        // check email
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user)
            return res.status(400).send('Invalid email or password');

        // check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send('Invalid email or password');

        // if (!config.get("jwtsec"))
        //     return res.status(500).send('Request can not be full filled.. token is not defined');

        const token = user.genAuthToken();

        // send res
        res.header("x-auth-token", token);
        res.status(200).send('logged-in successfully');
    } catch (error) {
        res.status(400).send('Bad Request.. ');
        console.log(error);
    }
});

module.exports = router;
