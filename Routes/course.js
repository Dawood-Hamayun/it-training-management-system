const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let registerCourse = path.join(__dirname, "../Frontend/course/course.html");
let coursePath = path.join(__dirname, "../Frontend/course/course.ejs");
let updateCourse = path.join(__dirname, "../Frontend/course/update-course.ejs")
let searchCourse = path.join(__dirname,'../Frontend/course/search-course');




router.get('/', function(req,res) {
    res.sendFile(registerCourse);
});

router.post('/', function(req, res){
    var name = req.body.name;
    var batch = req.body.batch;
    var year = req.body.year;
    var course_description = req.body.course_description;
    var credit_hours = req.body.credit_hours;

    db.getConnection(function(error){
        if(error) throw error;
        var sql = "INSERT INTO course(name, batch, year, course_description, credit_hours) VALUES(?, ?, ?, ?, ?)";
        db.query(sql, [name, batch, year, course_description, credit_hours], function (error,result){
            if(error) throw error;
            res.send("Course registered successfully "+result.insertId);
        });
    });
});


router.get('/view', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM course";
        db.query(sql, function(error, result){
            if(error) throw error;
            console.log(result);
            res.render(coursePath, {course:result});
        });
    });
});


router.get('/delete-course', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "DELETE FROM course where course_id=?";
        var id = req.query.course_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.redirect('/course/view');
        });
    });
});

router.get('/update-course', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * From course where course_id=?";
        var id = req.query.course_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.render(updateCourse, {course: result});
        });
    });
});

router.post('/update-course', function(req,res){
    var course_id = req.body.course_id;
    var name = req.body.name;
    var batch = req.body.batch;
    var year = req.body.year;
    var course_description = req.body.course_description;
    var credit_hours = req.body.credit_hours;
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "UPDATE course set name = ?, batch = ?, year = ?, course_description = ?, credit_hours = ? where course_id = ?";
        db.query(sql, [name, batch, year, course_description, credit_hours, course_id], function(error, result){
            if(error) throw error;
            res.redirect('/course/view');
        })
    })
});


router.get('/search-course', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM course";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchCourse, {course:result});
        });
    });
});

router.get('/search', function(req,res){
    var name = req.query.name;
    var batch = req.query.batch;
    var year = req.query.year;
    console.log(year);
    db.getConnection(function(error){
        if(error) throw error;
        var sql = "SELECT * FROM course where name LIKE '%"+name+"%' AND batch LIKE '%"+batch+"%' AND year LIKE '%"+year+"%'";
        console.log(sql);
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchCourse, {course:result});

        })
    })
});




module.exports = router;