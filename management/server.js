const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const mysql = require('mysql');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const db = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

db.connect();

const multer = require('multer'); //prevent duplicates on file names
const upload = multer({dest: './upload'}); //image files

//server connect to database - customer table
app.get('/api/customer', function(req, res){
  db.query(
    "SELECT * FROM CUSTOMER WHERE IsDeleted=0",
    function(err, rows, fields){
      console.log(err);
      res.send(rows); //send queried data to client 
    }
  );
});

app.use('/image', express.static('./upload'));// '/image' url gets mapped to './upload' directory
app.post('/api/customer', upload.single('image'), function(req, res){
  let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, ?, ?, ?, NOW(), 0)';
  let image = '/image/' + req.file.filename;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, firstName, lastName, birthday, gender, job];
  db.query(sql, params, function(err, rows, fields){
    console.log(err); 
    res.send(rows);
  });
})

app.delete('/api/customer/:ID', function(req,res){
  let sql = 'UPDATE CUSTOMER SET IsDeleted=1 WHERE ID=?';
  let params=[req.params.ID];
  db.query(sql, params, function(err, rows, fields){
    res.send(rows); //query 실행 후 결과를 client 측에 전송
  });
});

app.listen(port, function(){console.log(`Listening on port ${port}`)});