const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let instructorTeamRegister = path.join(__dirname, "../Frontend/teachingteam/teachingteam_instructor");


router.get('/', function(req,res,next){
    db.query("SELECT * FROM teachingteam", (err, teachingteam) => {
        db.query("SELECT * FROM instructor", (err, instructor) => {
          res.render(instructorTeamRegister, { teachingteam: teachingteam, instructor: instructor });
        });
      });
    });

router.post('/', function(req,res){
    const teachID = req.body.teaching_team_id;
    const instructor_id = req.body.instructor_id;
    // console.log(teachID,instructor_id);
  db.query("INSERT INTO teachingteam_instructor (teaching_team_id, instructor_id) VALUES (?, ?)",
    [teachID, instructor_id],
    (err, result) => {
        if (err) throw err;
    }
  );
});


module.exports = router;
