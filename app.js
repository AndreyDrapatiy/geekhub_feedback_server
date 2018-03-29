const express = require('express');
const app = express();
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

require('./mangoose');


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(__dirname + '/public'));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let userSchema = mongoose.Schema({
// the record model in superadmin
    login: String,
    password: String,
    status: String
});

let teacherSchema = mongoose.Schema({
// the record model in teachers
    name: String,
    course: String,
    image: String
});

let studentSchema = mongoose.Schema({
    _id:String,
    teacher: [],
    wasSend: String,
    closeLink: String
});

let superadmin = mongoose.model("superadmin", userSchema);
let teacher = mongoose.model("teacher", teacherSchema);
let student = mongoose.model("student", studentSchema);




app.get("/", function (req, res) { //При отсутствии супер админа, предложит создать, если он уже есть, залогинится
    res.render("login.ejs")
});




app.post("/login", function (req, res) {

    let login = req.param("login", null);
    let password = req.param("password", null);


    superadmin.find({login: login, password: password}, function (err, result) {
        if (result.length !== 0) {
            res.json(true)
        }
        else res.json(false)
    });

});

app.post("/teacher", function (req, res) {

    teacher.create({
            name: req.body.name,
            course: req.body.course,
            image: req.body.image
        },

        function (err) {
            if (err) return console.log(err);
        });

    res.json("save obj teacher");

});

app.get("/teacher", function (req, res) {

    teacher.find(function (err, result) {
            res.json(result)
        })
});

app.post("/sendmail", function (req, res) {


    for (let emails = req.body.emails, j = 0, lj = emails.length; j < lj; j++) {

        let recipient = emails[j];
        let teacher = req.body.teachers;
        let id = hash(Math.random().toString());

    student.create({
            _id:id,
            teacher: teacher,
            wasSend: "true",
            closeLink: "false"
        },

        function (err) {
            if (err) return console.log(err);
            console.log("Сохранен объект student");
        });


        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'geekhubfeedback@gmail.com', // generated ethereal user
                    pass: 'geekhub18' // generated ethereal password
                }
            });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'GeekHub FeedBack', // sender address
            to: recipient, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'https://rocky-sands-24081.herokuapp.com/feedback/'+id
            // html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
    });

    }
    res.json('ok')

});

app.get("/feedback/:id", function (req, res) {

    let id = req.body.id;

    res.json(id)

});




function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64')
}


MongoClient.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {

    if (err) {
        return console.log(err)
    }

    let port = process.env.PORT || 3003;
    app.listen(port, function () {
        console.log("Listening on " + port);
    });

});