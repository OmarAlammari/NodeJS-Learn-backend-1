const mongoose = require('mongoose');

//mongodb://127.0.0.1:27017/
// mongodb://localhost:27017/db1


//1)Connection with  DataBase
mongoose.connect('mongodb://127.0.0.1:27017/it'
    // , {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndexes: true
    // }
).then(() => {
    console.log('DataBase Connect...');
}).catch((err) => {
    console.log(err);
});

//3)Create Schema
// const Schema = mongoose.Schema;
const StudentSchema = new mongoose.Schema({
    fn: {
        type: String,
        uppercase: true,
        trim: true
    },
    ln: String,
    dept: {
        type: String,
        require: true,
        // enum: ["SD", "SA", "MD"],
        validate: {
            validator: (v) => /^[SM][AD]$/.test(v)
        }
        // match: /^[SM][AD]$/,// >> Start (S or M) & End (A or D)
        // minlength: 3,
        // maxlength: 6,
    },
    id: {
        type: Number,
        unique: true,
        require: true,
        set: (v) => v * 100
        // main: 30,
        // max: 3000,
    }
});

//4)Create Model
// const Student1 = await mongoose.Collection('Students');
const Student = mongoose.model('Students', StudentSchema);

//5)CRUD Operation
// Student.find().then((data) => {
//     console.log(data);
// });

// Student.find({}).where("fn").equals("omar").then(console.log);

// Student.find({ fn: "omar" }).then((data) => {
//     console.log(data);
// });

//  Student.findById("64a45ae8a3e8bdb51af4c571").then((data) => {
//     console.log(data);
// });students

async function getAllStudents() {
    let result = await Student.find({});
    // let result = await Student.find({}).limit(5).sort({ fn: 1 });
    // let result = await Student.find({}).limit(5).sort({ fn: 1 })
    //     .select({ fn: 1, ln: 1 });
    console.log(result);

}
getAllStudents();

function addNewStudents(fn, ln, dept, id) {
    let std = new Student({ fn: fn, ln: ln, dept: dept, id: id });
    std.save().then(() => {
        console.log('Saved..');
    }).catch((err) => {

        console.log(err);
        // for (let e in err.errors) {
        // }
    });
}
addNewStudents("OmarAlammari", "Omar2", "SA",5);


// const { ObjectId } = require('mongodb');
// const Connection = require('./index');
// const collection = (await Connection).db.collection('Students').
//     find({}).toArray();

// console.log(collection);





