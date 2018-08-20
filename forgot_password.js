//const mongodb = require('./connection.js'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const async = require('async');
const crypto = require('crypto');
const mongodb = require('mongodb').MongoClient;

let db;
var url = "mongodb://beulah:Beulah123@ds117422.mlab.com:17422/instamongodb"
mongodb.connect(url, (err, client) => {
     db = client.db('instamongodb');
})
exports.forgot_password = function(req,res,callback){ 
            var email = req.body.email;
            //console.log("fdgfg", mongodb.db());
               
   
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
                        console.log("hi")
                        var smtpTransport = nodemailer.createTransport({
                            host: 'email-smtp.us-west-2.amazonaws.com',
      //        secure: 'tls',
                            port: '587',
                            auth: {
                                user: 'AKIAISYNEOQO76S32XFQ',
                                pass: 'Ag7VtQAftnaWO2uVFsF+vEVAl+LWDCYcJCSt1Jvo7rli'
                             }
                        });
                         console.log("smtpTransport",smtpTransport)
                        var mailOptions = {
                        from: "bhavya@selotsoft.com", // sender address
                        to: "bhavya@selotsoft.com", // list of receivers
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