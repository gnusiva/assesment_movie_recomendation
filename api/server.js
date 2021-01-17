const express = require('express'), bodyParser = require('body-parser');
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const signingSecret = 'some-secret';
const username = 'test123';
const password = 'password123';
const token = jwt.sign({ username }, signingSecret);
const db = require('./db');

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  if ( req.body.username === username && req.body.password === password ) {
    res.send({token});
  } else {
    res.status(401);
    res.send();
  }
});

app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  } else {
    try {
      var token = jwt.verify(req.headers.authorization, signingSecret);
      if ( token.username === username ) {
        next();
      } else {
        return res.status(401).json({msg: 'Invalid Token'})
      }
    } catch( e ) {
      return res.status(401).json({msg: 'Invalid Token'})
    }
  }
});


app.get('/allmovies', (req, res) => {
    const movies = db.get('movies').value();
    res.send(movies)
});
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
