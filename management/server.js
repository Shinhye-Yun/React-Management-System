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
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

const multer = require('multer'); //prevent duplicates on file names
const upload = multer({dest: './upload'}); //image files

//server connect to database - customer table
app.get('/api/customer', (req, res)=>{
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      console.log(err);
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload'));// '/image' url gets mapped to './upload' directory
app.post('/api/customer', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, firstName, lastName, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    console.log(err); 
    res.send(rows);
  });
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));