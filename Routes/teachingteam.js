const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let teamRegister = path.join(__dirname, "../Frontend/teachingteam/teachingteam.html");
let teamPath = path.join(__dirname, "../Frontend/teachingteam/teachingteam.ejs");


router.get('/', function(req, res){
    res.sendFile(teamRegister);
});


router.post('/', function(req, res){
    var teaching_team_id = req.body.teaching_team_id;

    db.getConnection(function(error){
        if(error) throw error;
        var sql = "INSERT INTO teachingteam(teaching_team_id) VALUES (?)";
        db.query(sql, [teaching_team_id], function (error, result){
            if(error) throw error;
            res.send("Teaching team registered successfully");
        })
    })
});


router.get('/view', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "SELECT * FROM teachingteam";
        db.query(sql, function(error, result){
            if(error) throw error;
            res.render(teamPath, {teachingteam:result});
        });
    });
});


router.get('/delete-teachingteam', function(req,res){
    db.getConnection(function(error){
        if(error) throw error; 
        var sql = "DELETE FROM teachingteam where teaching_team_id=?";
        var id = req.query.teaching_team_id;
        db.query(sql, [id], function(error, result){
            if(error) throw error;
            res.redirect('/teachingteam/view');
        });
    });
});



module.exports = router;