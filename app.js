const express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
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

var userSchema = mongoose.Schema({
// the record model in bd
    login: String,
    password: String,
    status: String
});

var teacherSchema = mongoose.Schema({
// the record model in bd
    name: String,
    course: String,
    image: String
});

var superadmin = mongoose.model("superadmin", userSchema);
var teacher = mongoose.model("teacher", teacherSchema);




// app.get("/", function (req, res) { //При отсутствии супер админа, предложит создать, если он уже есть, залогинится
//     superadmin.find({status: "superadmin"}, function (err, result) {
//         if (result.length === 0) {
//             res.render('signin.ejs');
//         }
//         else {
//             res.render("login.ejs")
//         }
//     })
// });

app.get('/login', function (req, res) {
    res.render('login.ejs')
});
//
// app.post("/newsuperadmin", function (req, res) {
//
//     var id = hash(Math.random().toString());
//
//     superadmin.create({
//
//             _id: id,
//             email: req.body.email,
//             login: req.body.login,
//             password: hash(req.body.password),
//             status: "superadmin"
//
//         },
//
//         function (err) {
//             if (err) return console.log(err);
//             console.log("Сохранен объект superadmin", id);
//         });


//
//     nodemailer.createTestAccount((err, account) = > {
//
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false, // true for 465
//             auth: {
//                 user: 'drapatiy92@gmail.com', // generated ethereal user
//                 pass: 'drapatiy92' // generated ethereal password
//             }
//         });
//
//     let mailOptions = {
//         from: '"GeekHub Feedback" <drapatiy92@gmail.com>', // sender address
//         to: req.body.email, // list of receivers
//         subject: 'Confirm password', // Subject line
//         text: 'http://localhost:3000/' + id // plain text body
//         // html: '<b>Hello world?</b>' // html body
//     };
//
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) = > {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     });
// });
//     res.redirect('/login')


// });


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


app.get("/:id", function (req, res) {
    var confirmId = req.params.id;


});


function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64')
}


MongoClient.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {

    if (err) {
        return console.log(err)
    }

    var port = process.env.PORT || 3001;
    app.listen(port, function () {
        console.log("Listening on " + port);
    });

});