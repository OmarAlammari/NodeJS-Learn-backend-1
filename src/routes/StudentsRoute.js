const express = require('express');
const router = express.Router();
const StudentControllerDB = require('../controllers/StudentControllerDB')
const stdValidator = require('../middleware/StudentsValidatorMW');
const auth = require('../middleware/AuthPermissionMD');

router.all('/', (req, res, nxt) => {
    console.log("request recieved on students Collection...");
    nxt();
});

//REquest all Students
router.get('/', StudentControllerDB.getAllStudents);

//parameter middleware    
router.param('id', (req, res, nxt, id) => {

    //validation of parameter
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
        // if (Number(id)) {

        //add param as prop for req
        req.id = id;

        nxt();
    }
    else {
        res.status(400).send('invalid id');
    }
});

//REquest Students By Id
//passing data from clint to server via URL parameters
router.get('/:id', StudentControllerDB.getStudentByID);

// create new students
router.post('/', auth, stdValidator, StudentControllerDB.addNewStudent);


// delete existing student
router.delete('/:id', auth, StudentControllerDB.deleteStudentByID);

// update for student data
router.put('/:id', auth, StudentControllerDB.updateStudent);

module.exports = router;
