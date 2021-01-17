const express = require('express'), bodyParser = require('body-parser');
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/login', (req, res) => {
    if ( req.body.username === 'test123' && req.body.password === 'password123' ) {
      var token = jwt.sign({ username: 'test123' }, 'some-secret');
      res.send({token});
    } else {
      res.status(401);
      res.send();
    }
});
    

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
