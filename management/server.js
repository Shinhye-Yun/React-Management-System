const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res)=>{
    res.send([
        {
            'id': 1,
            'picture': 'https://placeimg.com/64/64/1',
            'name': 'Kate Smith',
            'birthday': 'March 03 1993',
            'gender': 'Female',
            'job': 'designer'
          },
          {
            'id': 2,
            'picture': 'https://placeimg.com/64/64/2',
            'name': 'Don Jo',
            'birthday': 'June 30 2003',
            'gender': 'Male',
            'job': 'student'
          },
          {
            'id': 3,
            'picture': 'https://placeimg.com/64/64/3',
            'name': 'Tom Cruise',
            'birthday': 'December 20 1988',
            'gender': 'Male',
            'job': 'actor'
          } 
    ]);
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));