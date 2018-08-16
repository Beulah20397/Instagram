// const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mongodb = require('./connection.js')


const prepareParams = (req) => {
	let paramsObj = {
	}
	paramsObj.email =  req.body.email,
    paramsObj.full_name = req.body.full_name,
	paramsObj.phone = req.body.phone,
	paramsObj.password = req.body.password;
	paramsObj.mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	paramsObj.ext = req.file.originalname.split('.')[1];
	paramsObj.imagepath =paramsObj.full_name+Date.now()+"."+paramsObj.ext;
	paramsObj.myRegex = /^([a-zA-Z0-9_-]+)$/;
	return paramsObj;
};
exports.register = function(req,res){
	console.log("hello")
	const preparedData = prepareParams(req);
	console.log('data', preparedData)
	console.log("extension is",preparedData.ext);
	// console.log("connection is",db)
    const hash = bcrypt.hashSync(preparedData.password, 10);
    console.log(hash);
	var users = {
		"email"  :preparedData.email,
		"full_name" : preparedData.full_name,
		"phone" : preparedData.phone,
		"password":hash,
		"status":1,
		"image_path" : preparedData.imagepath 
	};
	
	 if((!users.email) && (!users.phone) ){

		res.status(400);
		res.send({
			"message":"Please Enter Email or Password",
			"status" :false
		});
		console.log("Please Enter Email or Password");
	}
	else if(!users.full_name){
		res.status(400);
		res.send({
			"message":"full name Empty!!!!",
			"status" :false
		});
		console.log("full name Empty!!!!");
	}
	else if(preparedData.password.length < 8){
		res.status(400);
		res.send({
			"message":"Length of Password is too short!!!!",
			"status" :false
		});
		console.log("Length of Password is too short!!!!");
	}
	else if(!(preparedData.mailformat.test(String(users.email).toLowerCase()))){
					console.log("email is not valid");
					res.status(400);
					res.send({
						"message": "email is not valid",
    					"status": false
					});
	}
	else if(!((preparedData.ext === "jpeg") || (preparedData.ext === "png") || (preparedData.ext === "jpg"))){
					console.log("enter valid image");
					res.status(400);
					res.send({
						"message": "enter valid image",
    					"status": false
					})
				}
	else{
		console.log("fdgfg", mongodb.db());
		const query = mongodb.db("instamongodb");
		query.collection('InstaUsers').findOne({email:users.email,full_name:users.full_name},function(err,result){
			if(err){
				throw err;
				console.log("error is",err)
			}
			else
			{
				//console.log("Length of result is ",result);
				if(!result){
					query.collection('InstaUsers').insert(users,function(error,ress){
					console.log('ress', ress);
					if(error)
						throw error;
					else{
						const JWTToken = jwt.sign({
								        
								        email: users.email
								      },
								      'secret',
								       {
								         expiresIn: 7200
						        		}
						        	);
						res.status(200).send({
							"message":"User Registered",
							"status":true,
							"data":users,
							"token":JWTToken
						});
						console.log("User Registered")
					}

					})	
				}else if(result.status == 0){
					    var myquery = { email: users.email };
  						var newvalues = { $set: {status: "1"} };
						query.collection('InstaUsers').update(myquery,newvalues,function(err,ress){
						if(err){
							throw err;
						}
						else
							res.status(200).send({
								"message":"Reactivated",
								"status":true
							})
						})
				}
				else{
					console.log("result is",result.status);
					res.status(400).send({
						"message":"User Already Exists",
						"status":"Failed"
					})
				}
			}
		})
		
	}

 }