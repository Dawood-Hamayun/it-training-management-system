const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let registerPath = path.join(__dirname, "../Frontend/trainee/trainee.html");
let traineePath = path.join(__dirname, "../Frontend/trainee/trainee.ejs");
let updateTrainee = path.join(__dirname, "../Frontend/trainee/update-trainee.ejs")
let searchTrainee = path.join(__dirname,'../Frontend/trainee/search-trainee');




router.get('/', function(req,res) {
    res.sendFile(registerPath);
});

router.post('/', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var age = req.body.age;
    var gender = req.body.gender;


    db.getConnection(function(error){
        if(error) throw error;
        var sql = "INSERT INTO trainee(name, email, address, age, gender) VALUES(?, ?, ?, ?, ?)";
        db.query(sql, [name, email, address, age, gender], function (error,result){
            if(error) throw error;
            res.send("Course registered successfully "+result.insertId);
        });
    });
});

router.get('/view', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM trainee";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(traineePath, {trainee:result});
        });
    });
});

router.get('/delete-trainee', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "DELETE FROM trainee where trainee_id=?";
        var id = req.query.trainee_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.redirect('/trainee/view');
        });
    });
});


router.get('/update-trainee', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * From trainee where trainee_id=?";
        var id = req.query.trainee_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.render(updateTrainee, {trainee: result});
        });
    });
});

router.post('/update-trainee', function(req,res){
    var trainee_id = req.body.trainee_id;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var age = req.body.age;
    var gender = req.body.gender;
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "UPDATE trainee set name = ?, email = ?, address = ?, age = ?, gender = ? where trainee_id = ?";
        db.query(sql, [name, email, address, age, gender, trainee_id], function(error, result){
            if(error) throw error;
            res.redirect('/trainee/view');
        })
    })
});

router.get('/search-trainee', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM trainee";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchTrainee, {trainee:result});
        });
    });
});

router.get('/search', function(req,res){
    var name = req.query.name;
    var email = req.query.email;
    db.getConnection(function(error){
        if(error) throw error;
        var sql = "SELECT * FROM trainee where name LIKE '%"+name+"%' AND email LIKE '%"+email+"%'";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(searchTrainee, {trainee:result});

        })
    })
});

module.exports = router;