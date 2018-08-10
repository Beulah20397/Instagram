const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const connection = require('./connection.js');
	

exports.updatePost = function(req,res,callback){
	var posts = {
		"post"  :req.body.post,
		"post_name" : req.body.post_name,
		"location" : req.body.location,
		"status" : "1" 
	};
	var token = req.headers['x-access-token'];
	console.log(req.headers);
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{

            console.log("decoded id is",decoded.email)
        	if(posts.post === " "){
				res.status(400);
				res.send({
					"message":"Posts Empty",
					"status" :false
				});
				console.log("Fields Empty");
			}
			else if(posts.post_name === " "){
				res.status(400);
				res.send({
					"message":"Post name Empty",
					"status" :false
				});
				console.log("Post name Empty");
			}
			
			else{
				console.log("decoded email is",decoded._id);
				db.collection('InstaUsers').findOne({
					$or: [{ '_id' : decoded._id },{ 'email': decoded.email }]
				},function(err,result){
					if(err)
						throw err;
					else
						if(!result){
							res.status(400).send({
								"message":"User Does Not Exist",
								"status" : false,
							})
						}
						else
						{
							db.collection('instaPost').findOneAndUpdate({"_id":ObjectID(posts.post_id)},{$set:{"post":posts.post,"post_name":posts.post_name,"location":posts.location,"user_id":decoded._id}},function(err,result){
							if(err)
								throw err;
							else{
								res.status(200);
								res.send({
									"message":"Document Updated",
									"status":true,
									"data":posts
								});
								console.log("Document Updated");
							}

							})			
						}
				})
				
			}
        }
    });
}