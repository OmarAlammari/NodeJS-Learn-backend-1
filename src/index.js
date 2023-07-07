const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

process.on('uncaughtException', (exception) => {
    console.log('uncaught Exception');
    process.exit(1);

});

process.on('unhandledRejection', (exception) => {
    console.log('Promise Rejection');
    process.exit(1);
});

const studentsRouter = require('./routes/StudentsRoute');
const userRouter = require('./routes/UserRoute');
const adminRoute = require('./routes/adminRoute');
const authRoute = require('./routes/authRoute');
const logging = require('./middleware/logging');
const errorMD = require('./middleware/errorMD');

const url = 'mongodb://127.0.0.1:27017/it';

//2)set Connection
mongoose.connect(url).then(() => {
    console.log('DataBase Connect...');
}).catch((err) => {
    console.log(err);
});

// built-in Middleware
app.use(express.json()); //Parse JSON sent body by clint throught request body

app.use(express.urlencoded({ extended: true })); // Parse URL encoded payload

app.use(express.static("public")); // Static files (css,js,img,html...)
// app.use(express.static("/assets","public"));

app.use(cookieParser());

//3rd party middleware
app.use(helmet());

// throw Error('unhandled exception');

// Promise.reject(new Error("fail")).then(
//     () => {
//         console.log('success')
//     },
//     (error) => {
//       console.error(error); // Stacktrace
//     },
//   );

// Promise.reject(new Error('Something went wrong')).then(() => { console.log('success'); });
let p = Promise.reject(new Error('Something went wrong'));
p.then(() => { console.log('success'); });

//custom Middleware (Application Middleware)
//logging
app.use(logging);

app.use('/api/students', studentsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', authRoute);
app.use('/api/admin', adminRoute);

app.use(errorMD); // express error Middleware

const port = process.env.PORT || 3000;

app.get('*', (req, res, nxt) => {
    console.log("get request recieved...");
    nxt();
});

// Route Handler Middleware
app.get('/',
    (req, res, next) => {
        //
        //
        next();
    },
    (req, res, next) => {
        //
        //
        console.log("stage #1");
        next();
    },
    (req, res) => {
        res.sendFile(path.join(__dirname, '/main.html'));
    });

//app settings
app.set("template engine", "ejs");
// app.set("views", "templates");

//Query String
app.get('/welcome.html', (req, res) => {
    console.log(req.query);
    console.log(req.query.fnm);
    console.log(req.query.lnm);

    res.sendFile(path.join(__dirname, '/welcome.html'));
});

//REQ body
app.post('/welcome.html', (req, res) => {
    console.log(req.body);

    // res.cookie("username", req.body.fnm);
    // res.cookie("user_age", 22);

    // with Encoded
    res.cookie("username", Buffer.from(req.body.fnm).toString('base64'));
    res.cookie("user_age", 22, { httpOnly: true });

    res.send(`thanks ${req.body.fnm} ${req.body.lnm} for sending required data`)
});

app.get('/abc', (req, res) => {
    console.log(Buffer.from(req.cookies.username, 'base64').toString());
    console.log(req.cookies.age);

    res.sendStatus(200);
});

app.listen(port, () => console.log('true'));