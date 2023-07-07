const express = require('express');
const router = express.Router();

const auth = require('../middleware/AuthPermissionMD');
const { User } = require('../models/UserModelDB');

// update
router.put('/:id', auth, (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.id },
        { isAdmin: true }).then((data) => {
            if (data)
                res.status(200).send('User Role is set to Admin...');
            else
                res.status(400).send('User Not Found...');
        }).catch(err => {
            console.log(err);
            res.status(500).send('Internet Server Error...');
        });

    /* User.findByIdAndUpdate(
        { _id: req.params.id },
         { isAdmin: true },
        //  { new: true },
        { runValidators: true },
        function (err, data) {
            if (!err) {
                if (data)
                    res.status(200).send('User Role is set to Admin...');
                else
                    res.status(400).send('User Not Found...');
            }
            else {
                res.status(500).send('Internet Server Error...');
            }
        }
    ); */
});


module.exports = router;
