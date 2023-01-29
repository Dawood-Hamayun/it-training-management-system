const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let registerInstructor = path.join(__dirname, "../Frontend/instructor/instructor.html");
let instructorPath = path.join(__dirname, "../Frontend/instructor/instructor.ejs");
let updateInstructor = path.join(__dirname, "../Frontend/instructor/update-instructor.ejs")
let searchInstructor = path.join(__dirname,'../Frontend/instructor/search-instructor');




router.get('/', function(req,res) {
    res.sendFile(registerInstructor);
});

router.post('/', function(req, res){
    var name = req.body.name;
    var address = req.body.address;
    var major = req.body.major;

    db.getConnection(function(error){
        if(error) throw error;
        var sql = "INSERT INTO instructor(name, address, major) VALUES(?, ?, ?)";
        db.query(sql, [name, address, major], function (error,result){
            if(error) throw error;
            res.send("Instructor registered successfully "+result.insertId);
        });
    });
});


router.get('/view', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM instructor";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(instructorPath, {instructor:result});
        });
    });
});


router.get('/delete-instructor', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "DELETE FROM instructor where instructor_id=?";
        var id = req.query.instructor_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.redirect('/instructor/view');
        });
    });
});

router.get('/update-instructor', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * From instructor where instructor_id=?";
        var id = req.query.instructor_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.render(updateInstructor, {instructor: result});
        });
    });
});

router.post('/update-instructor', function(req,res){
    var instructor_id = req.body.instructor_id;
    var name = req.body.name;
    var address = req.body.address;
    var major = req.body.major;
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "UPDATE instructor set name = ?, address = ?, major = ?, where instructor_id = ?";
        db.query(sql, [name, address, major, instructor_id], function(error, result){
            if(error) throw error;
            res.redirect('/instructor/view');
        })
    })
});


router.get('/search-instructor', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM instructor";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchInstructor, {instructor:result});
        });
    });
});

router.get('/search', function(req,res){
    var name = req.query.name;
    var email = req.query.email;
    db.getConnection(function(error){
        if(error) throw error;
        var sql = "SELECT * FROM instructor where name LIKE '%"+name+"%'";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchInstructor, {instructor:result});

        })
    })
});




module.exports = router;