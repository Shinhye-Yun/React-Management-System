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

app.listen(port, ()=> console.log(`Listening on port ${port}`));