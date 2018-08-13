const express = require('express');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs-extra');
//importing modules
const createPost = require('./createPost');
const updatePost = require('./updatePost');
const archivePost = require('./archivePost');
const listPost = require('./listPost');
const deletePost = require('./deletePost');
const tagging = require('./tagging');
const likes = require('./likes');
const follow = require('./follow');
const comment = require('./comment');
const login = require('./login');
const register = require('./register');
const forgot_password = require('./forgot_password');

const facebook_login = require('./facebook_login');

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended:false}));


var storage = multer.diskStorage({
     destination: (req, file, callback) => {
      let type = req.params.type;
      let path = `./uploads/${type}`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     },
     fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const files = req.file.originalname.split('.')[1];
            if(files === 'png' || files === 'jpeg' || files ==='jpg' || files === 'mp4'){
              console.log('file uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
 });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Credentials', "*");
  res.header('Access-Control-Expose-Headers', 'x-access-token'); 
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");//essta linha habilita o token no header
  next();
});
app.get('/', function(req, res) {
  res.send({
            "message":"Hi",
        })
});
app.post('/createPost',multer({storage:storage}).any('posts'),createPost.createPost);
app.post('/updatePost',updatePost.updatePost);
app.post('/archivePost',archivePost.archivePost);
app.get('instagram-beulah.herokuapp.com/listPost',listPost.listPost);
app.post('/deletePost',deletePost.deletePost);
app.post('/tagging',tagging.tagging);
app.post('/like',likes.likes);
app.post('/follow',follow.follow);
app.post('/comment',comment.comment);
app.post('/login',login.login);
app.post('/register',multer({storage:storage}).single('image'),register.register);
app.post('/forgot_password',forgot_password.forgot_password);

// app.post('/facebookLogin',facebookLogin.facebookLogin);
// app.post('/googleLogin',googleLogin.googleLogin);

app.listen(process.env.PORT || 3000);