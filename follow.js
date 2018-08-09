const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
	const url = process.env.MONGOLAB_URI;

const connection = require('./connection.js');

exports.follow = function(req,res,callback){
	var posts = {
		"following_id"  :req.body.following_id
	};

	var token = req.headers['x-access-token'];
	console.log(req.headers);
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{
				console.log("decoded email is",decoded._id);
				console.log("Post id is",posts);

					

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
							db.collection('follows').find({$and: [{ 'user_id' : decoded._id },{ 'following_id': posts.following_id}]}).toArray(function(err,result){
							if(err)
								throw err;
							else{
								console.log("result is",result);
								console.log('length of result is',result.length);
								if(!(result.length == 0)){
									console.log('length  result is', result.length);
										db.collection('follows').findOneAndUpdate({$and: [{ 'user_id' : decoded._id },{ 'following_id': posts.following_id}]},{$set:{'follow_count':"0"}},function(err,resul){
										if(err)
											throw err;
										else{
											res.status(200);
											res.send({
												"message":"User unfollowed",
												"status":true,
												"data":resul
											});
											console.log("Document Updated",resul);
										}

									})
								}else{
									console.log("result of table follows is",result.length);
									db.collection('follows').insert({"user_id":decoded._id,"following_id":posts.following_id,"follow_count":"1"},function(err,resul){
									if(err)
										throw err;
									else{
										res.status(200);
										res.send({
											"message":"User followed",
											"status":true,
											"data":result
										});
									console.log("Document Inserted")
									}
								})
								}
								
								
							}

							})		
						}
				})
        	}
    });
}