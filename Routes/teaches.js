const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let teachesDir = path.join(__dirname, "../Frontend/teaches/teaches.ejs");


router.get('/', function(req,res,next){
    db.query("SELECT * FROM teachingteam", (err, teachingteam) => {
        db.query("SELECT * FROM course", (err, course) => {
          res.render(teachesDir, { course: course, teachingteam: teachingteam });
        });
      });
    });

router.post('/', function(req,res){
    const teachID = req.body.teaching_team_id;
    const courseID = req.body.course_id;
    // console.log(teachID,instructor_id);
  db.query("INSERT INTO teaches(teaching_team_id, course_id) VALUES (?, ?)",
    [teachID, courseID],
    (err, result) => {
        if (err) throw err;
        res.send("Registered successfully "+result.insertId);
    }
  );
});


module.exports = router;
