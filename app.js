const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});