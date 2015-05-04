var db = require('./db/configMongoose');
var express = require('express');
var partials = require('express-partials');
var Item = require('./db/dbModels/itemModel.js');
var bodyParser = require('body-parser');
var multer  = require('multer')

var app = express()
app.use(multer({ dest: './uploads/'}))

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));




app.get('/rent', function(req, res){
  Item.find({}, function(err, docs){
    if(!err){
      res.status(200).send({results: docs});
    } else {
      console.log(err)
      res.status(500).send({errorMessage: 'We fucked up. Sorry:( Woo!'});
    }
  });
});

app.post('/list', function(req, res){
  console.log(req.body)
  var newPool = new Item({name: req.body.name, address: req.body.address, price: req.body.price});
  newPool.save(function(err) {
    if(err){
      console.log(err);
    }
    res.status(201).send({post: 'you posted to the database'});
  });
});

app.post('/uploadimg', function(req, res){
  console.log('Uploading');
  console.log( req.files);
  res.status(201).send('1');
});

module.exports = app;
