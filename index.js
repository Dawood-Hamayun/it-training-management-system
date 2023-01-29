var db = require("./server");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const e = express();
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
const traineeRoute = require('./Routes/trainee');
const instructorRoute = require('./Routes/instructor');
const courseRoute = require('./Routes/course');
const teachingTeam = require('./Routes/teachingteam.js');
const instructorTeachingTeam = require('./Routes/teachingteam_instructor');
const enrollmentPath = require('./Routes/enrollment');
const teachesPath = require('./Routes/teaches');
const homePage = path.join(__dirname, 'index.html')


app.get('/', function(req,res){
    res.sendFile(homePage);
})

app.use('/trainee', traineeRoute);
app.use('/instructor', instructorRoute);
app.use('/course', courseRoute);
app.use('/teachingteam', teachingTeam);
app.use('/teachingteam-instructor', instructorTeachingTeam);
app.use('/enrollment', enrollmentPath);
app.use('/teaches', teachesPath);


process.on('warning', e => console.warn(e.stack));

app.listen(8800);

