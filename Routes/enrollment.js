const express = require("express");
const router = express.Router();
const db = require('../server');
const path = require('path');
let enrollmentDir = path.join(__dirname, "../Frontend/enrollment/enrollment.ejs");


router.get('/', function(req,res,next){
    db.query("SELECT * FROM course", (err, course) => {
        db.query("SELECT * FROM trainee", (err, trainee) => {
          res.render(enrollmentDir, { course: course, trainee: trainee });
        });
      });
    });

router.post('/', function(req,res){
    const course_id = req.body.course_id;
    const trainee_id = req.body.trainee_id;
    // console.log(teachID,instructor_id);
  db.query("INSERT INTO enrollment(course_id, trainee_id) VALUES (?, ?)",
    [course_id, trainee_id],
    (err, result) => {
        if (err) throw err;
        res.send("Enrolled successfully "+result.insertId);
    }
  );
});


module.exports = router;
