const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('./mangoose');

var fs = require('fs');
var busboy = require('connect-busboy');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use(busboy());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var userSchema = mongoose.Schema({
// the record model in superadmin
    login: String,
    password: String,
    status: String
});

var teacherSchema = mongoose.Schema({
// the record model in teachers
    name: String,
    course: String,
    image: String
});

var superadmin = mongoose.model("superadmin", userSchema);
var teacher = mongoose.model("teacher", teacherSchema);




app.get("/", function (req, res) { //При отсутствии супер админа, предложит создать, если он уже есть, залогинится
    res.render("login.ejs")
});




app.post("/login", function (req, res) {

    var login = req.param("login", null);
    var password = req.param("password", null);


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

    var teachers = req.body.teachers;

    const nodemailer = require('nodemailer');




    for (var emails = req.body.emails, j = 0, lj = emails.length; j < lj; j++) {

        console.log(emails[j]);

        var recipient = emails[j];

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'geekhubfeedback@gmail.com', // generated ethereal user
                    pass: 'geekhub18' // generated ethereal password
                }
            });

        // setup email data with unicode symbols
        var mailOptions = {
            from: 'GeekHub FeedBack', // sender address
            to: recipient, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello', // plain text body
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

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    });

    }
    res.json('ok')

});






function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64')
}


MongoClient.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {

    if (err) {
        return console.log(err)
    }

    var port = process.env.PORT || 3002;
    app.listen(port, function () {
        console.log("Listening on " + port);
    });

});