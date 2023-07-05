const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/it';

//1)Connection with  DataBase
mongoose.connect(url).then(() => {
    console.log('DataBase Connect...');
}).catch((err) => {
    console.log(err);
});

//3)Create Schema
const StudentSchema = new mongoose.Schema({
    fn: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
        trim: true,
    },
    ln: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
        trim: true,
    },
    dept: {
        type: String,
        required: true,
        default: "SD"
    },
    id: {
        type: Number,
        required: true
    }
});

//4)Create Model
const Student = mongoose.model('Students', StudentSchema);

module.exports = Student;

