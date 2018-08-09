const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const async = require('async');
const crypto = require('crypto');
//const passport = require('passport');

const url = "mongodb://localhost:27017/InstaMongoDb";
const connection = require('./connection.js');


exports.forgot_password = function(req,res,callback){ 
   
            db.collection('InstaUsers').findOne({ 'email': req.body.email },function(err,result){
                if(err)
                    throw err;
                else{
                    console.log("result is",result)
                    if(!result){
                        res.send({
                            "message":"No account with that email exixts",
                            auth:false
                        })

                    }else{
                        var smtpTransport = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: '587',
                            auth: {
                                user: 'beulah@yopmail.com',
                                pass: 'mobikasa@'
                            }
                        });
                        var mailOptions = {
                        from: "beulahbabu20397@gmail.com", // sender address
                        to: "beulah@mobikasa.com", // list of receivers
                        subject: 'Hello ✔', // Subject line
                        text: 'Hello world 🐴', // plaintext body
                        html: '<b>Hello world 🐴</b>' // html body
}
                    };
                    smtpTransport.sendMail(mailOptions,function(error,info){
                        if(error){
                            console.log("error is",error);
                        }
                        console.log("message sent"+info);
                    });
                }
            })
      
        
}