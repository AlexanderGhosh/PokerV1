const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});

app.get('/*.ico', function(req, res) {
  res.sendFile('/static/assets/cards/CardBack.png');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
