const fs = require('fs');
const path = require('path');
const studentsPath = path.join(path.dirname(process.mainModule.filename), 'data', 'Students.json');

module.exports = class Student {

    constructor({ name: nm, dept }) {
        // constructor(nm, dept) {
        this.name = nm;
        this.dept = dept;
    }
    saveStudent() {
        // Students.push(this);
        //1)read from file
        fs.readFile(studentsPath, (err, info) => {
            let Students = [];
            if (!err) {
                Students = JSON.parse(info);
                this.id = Students.length + 1;

                //2)update data
                Students.push(this);

                //3)write info file
                fs.writeFile(studentsPath, JSON.stringify(Students), (err) => {
                    console.log(err);
                });
            }
        });
    }
    static fetchAllStudents(callback) {
        fs.readFile(studentsPath, (err, info) => {
            if (!err) {
                callback(JSON.parse(info));
            }
            else{
                callback([]);
            }
        });
    }
}