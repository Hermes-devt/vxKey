const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: req.body });
});

app.post('/api/register', (req, res)=>{
  res.send({ express: req.body });
  res.end();
});

mongoose.connect('mongodb://localhost/todolist', {useNewUrlParser: true, useUnifiedTopology: true})
  .then( ()=> console.log('successfully connnected to mongoDB'))
  .catch( (error)=>{ console.log(error.message)});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

