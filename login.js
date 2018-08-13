const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const config = require('./config')


const connection = require('./connection.js');


exports.login = function(req,res){
	//console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	console.log("email is",req.body);
	console.log("connection is",connection)
if(!email){
	res.status(400);
	res.send({
		"message":"Invalid Email!!!!",
		auth:false
	})
}
else if(!password){
	res.status(400);
	res.send({
		"message":"Invalid password",
		auth:false
	})
}
// else
// {	console.log("hello");
// 	db.collection('InstaUsers').findOne({email:email}),(function(err,results){
// 		console.log(results);
// 		if(err)
// 			throw err;
// 		else if(results)
// 		{	var re = {
// 			"email":results.email,
// 			"image":results.imagepath,
// 			"username" : results.full_name
// 			}
// 			console.log("result is",re);

// 			hashedPassword = results.password;	
// 	        bcrypt.compare(password, hashedPassword, (err, result) => {
// 	        if (err) {
// 	            console.log('bcrypt - error - ', err);
// 	            } else {
// 	        	       console.log('bcrypt - result - ', result);
// 	            	   res.status(200);
// 	              	   res.send({
// 	               	   "status":true,
// 	               	   "success":"successfully logged in!!!",
// 	               	   "data":re
// 	               	   })
// 	            	}
// 	         });
// 		}else{
// 			res.status(400).send({
// 				"message" : "User Does not exist",
// 				auth:"failed"
// 			})
// 		}

		
// 	});


// }
else{
		db.collection('InstaUsers').findOne({email:email},function(err,result){
			if(err){
				throw err;
			}
			else
			{
				console.log("Length of result is ",result);
				if(result){
						if(err)
						throw err;
					else{
						const JWTToken = jwt.sign({
								        email: result.email,
								        _id: result._id
								      },
								      'secret',
								       {
								         expiresIn: '2h'
						        });
						res.status(200).send({
							"message":"User logged IN!!!",
							"status":true,
							
							"token":JWTToken
						});
						console.log("User logged IN!!!!")
					}

					
						}else
						{
							res.status(400).send({
								"message" : "User Does not Exists",
								auth : false
							})
						}
				// }else if(result.status == 0){
				// 	    var myquery = { email: users.email };
  		// 				var newvalues = { $set: {status: "1"} };
				// 		db.collection('InstaUsers').update(myquery,newvalues,function(err,ress){
				// 		if(err){
				// 			throw err;
				// 		}
				// 		else
				// 			res.status(200).send({
				// 				"message":"Reactivated",
				// 				"status":true
				// 			})
				// 		})
				// }
				// else{
				// 	console.log("result is",result.status);
				// 	res.status(400).send({
				// 		"message":"User Already Exists",
				// 		"status":"Failed"
				// 	})
				// }
			}
		})
		
	}
}
