var db = require('./db/configMongoose');
var express = require('express');
var partials = require('express-partials');
var Item = require('./db/dbModels/itemModel.js');
var User = require('./db/dbModels/userModel.js');
var bodyParser = require('body-parser');
var multer  = require('multer');

var app = express()
app.use(multer({ dest: './uploads/'}))

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/rentItems', function(req, res){
  console.log(req.body);
  var date = req.body.date || '2015/05/06';
  Item.find({}, function(err, docs){
    if(!err){
      res.status(200).send({results: docs});
    } else {
      console.log(err)
      res.status(500).send({errorMessage: 'We fucked up. Sorry:( Woo!'});
    }
  });
});

app.get('*', function (req, res) {
  var options = {
    root: __dirname + '/../client',
  };
  res.sendFile('index.html', options, function (err) {
    if(err) console.log(err);
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

app.post('/signup', function(req, res) { 
  var info = req.body;
  User.findOne({ username : info.username}, function(err, user) {
    if(err) {
      console.log('signup, error',err);
      res.status(500).send({errorMessage: 'error in searching database upon signup'});
    }
    else if (!user) {
      var newUser = new User({
        username: info.username,
        password: info.password
      });

      newUser.save(function(err, newUser) {
        if(err) {
          console.log('error in saving new user information');
          res.status(500).send({errorMessage: 'error in saving user info to Database'})
        }
        else {
          console.log('successful signup');
          res.status(302).send("Login");
        }
      });
    }
    else {
      console.log('username is already taken!', user);
      res.status(302).send('Sign Up');
    }
  });
});

app.post('/login', function(req, res) {
  var info = req.body;
  User.findOne({username: info.username}, function(err, user) {
    if(err) {
      res.status(500).send({errorMessage: 'error in search of db upon login'});
    } 
    else if(user) {
      user.comparePassword(info.password, function(err, match) {
        if(err) {
          console.log('error in comparison!', err);
          res.status(500).send({errorMessage:'error in comparison of password'});
        }
        else {
          if(match) {
            console.log('successful login!');
            res.status(302).send('/');
          } 
          else {
            console.log('password fail!');
            res.status(302).send('Login');
          }
        }
      });
    }
    else {
      console.log('username does not exist')
      res.status(302).send('Login');
    }
  });
});

module.exports = app;
