const express = require('express'), bodyParser = require('body-parser');
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const signingSecret = 'some-secret';
const username = 'test123';
const password = 'password123';
const token = jwt.sign({ username }, signingSecret);
const db = require('./db');
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.post('/login', async (req, res) => {
  setTimeout( async () => {
    const userObj = db.get('users').find({username: req.body.username}).value();
    if ( !userObj ) { res.status(401); res.send(); return; }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, userObj.password);
    if ( isPasswordCorrect ) {
      res.send({token});
    } else {
      res.status(401);
      res.send();
    } 
  }, 3000);
  
});
app.use(express.static('public'))
app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  } else {
    try {
      var token = jwt.verify(req.headers.authorization, signingSecret);
      if ( token.username === username ) {
        req.token = token;
        next();
      } else {
        return res.status(401).json({msg: 'Invalid Token'})
      }
    } catch( e ) {
      return res.status(401).json({msg: 'Invalid Token'})
    }
  }
});


app.get('/all-movies', (req, res) => {
  const movies = db.get('movies').value();
  res.send(movies)
});
  
app.get('/recent-movies', (req, res) => {
  const token = req.token; 
  const movies = db.get('users').find({username: token.username}).value().recentMovies;
  res.send(movies)
});

app.get('/clear-recent-movies', (req, res) => {
  const token = req.token; 
  const movies = db.get('users').find({username: token.username}).get('recentMovies').remove( (item) => true).write();
  res.send(movies)
});
  
app.get('/recommended-movies', (req, res) => {
  const token = req.token;
  const movies = db.get('users').find({username: token.username}).value().recommendedMovies;
  res.send(movies)
});

app.post('/add-recent-movie', (req, res) => {
  const token = req.token;
  db.get('users')
  .find({username: token.username})
  .get('recentMovies')
  .push(req.body)
  .write();
  res.send();
});
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
