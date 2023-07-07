
const Student = require('../models/StudentsModelDB');
const asyncFunction = require('../middleware/async');

// create Student
let addNewStudent = (req, res, nxt) => {
    let std = new Student({
        fn: req.body.fn,
        ln: req.body.ln,
        dept: req.body.dept,
        id: req.body.id
    });
    std.save()
        .then(() => {
            res.status(200).send(std);
        })
        .catch((err) => {
            nxt(err);
            // res.status(400).send('Bad Request.. Some Fields are missed');
        });
};
/* let addNewStudent1 = asyncFunction(async (req, res) => {
    let std = new Student({
        fn: req.body.fn,
        ln: req.body.ln,
        dept: req.body.dept,
        id: req.body.id
    });
    std.save()
        .then(() => {
            res.status(200).send(std);
        })
        .catch((err) => {
            nxt(err);
            // res.status(400).send('Bad Request.. Some Fields are missed');
        });
}); */


// getAllStudents
let getAllStudents = asyncFunction(async (req, res) => {
    let std = await Student.find()
        .select(
            {
                fn: 1, ln: 1, id: 1
            }
        )
        .sort({ id: -1 });
    res.send(std);
});

// getStudentById
let getStudentByID = asyncFunction(async (req, res) => {
    let std = await Student.findById(req.params.id);
    if (!std)
        return res.status(400).send('Student with the given ID was not found');
    return res.send(std);
});

// updateStudent
let updateStudent = asyncFunction(async (req, res) => {
    let std = await Student.findOneAndUpdate(
        req.params.id, req.body,
        { returnOriginal: false }
    );
    if (!std)
        return res.status(400).send('Bad Request.. Some Fields are missed');
    return res.send(std);
});

// deleteStudent
let deleteStudentByID = asyncFunction(async (req, res) => {

    let std = await Student.findByIdAndRemove(req.params.id);
    if (!std)
        return res.status(400).send('Student with the given ID was not found');
    return res.send(std);
});

module.exports = {
    addNewStudent, deleteStudentByID, updateStudent,
    getAllStudents, getStudentByID
}

/*
// create Student
 let addNewStudent = (req, res, nxt) => {
    let std = new Student({
        fn: req.body.fn,
        ln: req.body.ln,
        dept: req.body.dept,
        id: req.body.id
    });
    std.save()
        .then(() => {
            res.status(200).send(std);
        })
        .catch((err) => {
            nxt(err);
            // res.status(400).send('Bad Request.. Some Fields are missed');
        });
};

// getStudentById
let getStudentByID = async (req, res, nxt) => {
    try {
        let std = await Student.findById(req.params.id);
        if (!std)
            return res.status(400).send('Student with the given ID was not found');
        return res.send(std);
    } catch (err) {
        nxt(err);
        // res.status(400).send('Bad Request.. Some Fields are missed');
    }
}



// getAllStudents
let getAllStudents = async (req, res, nxt) => {
    try {
        let std = await Student.find()
            .select(
                {
                    fn: 1, ln: 1, id: 1
                }
            )
            .sort({ id: -1 });
        res.send(std);
    } catch (err) {
        nxt(err);
    }
}


// updateStudent
let updateStudent = async (req, res, nxt) => {
    try {
        let std = await Student.findOneAndUpdate(
            req.params.id, req.body,
            { returnOriginal: false }
        );
        if (!std)
            return res.status(400).send('Bad Request.. Some Fields are missed');
        return res.send(std);
    } catch (err) {
        nxt(err);
    }
};

// deleteStudent
let deleteStudentByID = async (req, res, nxt) => {
    try {
        let std = await Student.findByIdAndRemove(req.params.id);
        if (!std)
            return res.status(400).send('Student with the given ID was not found');
        return res.send(std);
    } catch (err) {
        nxt(err);
    }
}
*/
