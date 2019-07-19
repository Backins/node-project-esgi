const db = require('./lib/db');
const User = require('./models/user');
const verifyToken = require('./lib/middlewares/security');
const express = require('express');
const app = express();
const movieRouter = require('./routes/movies');
const staffRouter = require('./routes/staff');
const securityRouter = require('./routes/security');
const bodyparser =  require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(bodyparser.json());
app.use(verifyToken);
app.get('/hello', (req,res) => res.send('Hello you'));
app.use('/movies',movieRouter);
app.use('/staffs',staffRouter);
app.use('/',securityRouter);

app.listen(3000,() => console.log('---> Listening port 3000'));