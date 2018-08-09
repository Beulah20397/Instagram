const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
	const url = process.env.MONGOLAB_URI;
const connection = require('./connection.js');


exports.likes = function(req,res,callback){
	var posts = {
		"post_id"  :req.body.post_id
	};

	var token = req.headers['x-access-token'];
	console.log(req.headers);
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{
				console.log("decoded email is",decoded._id);
				console.log("Post id is",posts);

					var like_data = {
					"user_id" : decoded._id,
					"post_id" : posts.post_id,
					"like_count" : "1"
					}	

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
							db.collection('likes').find({$and: [{ 'user_id' : decoded._id },{ 'post_id': posts.post_id}]}).toArray(function(err,result){
							if(err)
								throw err;
							else{
								console.log('length of result is',result.length);
								if(!(result.length == 0)){
									console.log('length  result is', result.length);
										db.collection('likes').findOneAndUpdate({$and: [{ 'user_id' : decoded._id },{ 'post_id': posts.post_id}]},{$set:{"like_count":"0"}},function(err,resul){
										if(err)
											throw err;
										else{
											res.status(200);
											res.send({
												"message":"Document unliked",
												"status":true,
												"data":resul
											});
											console.log("Document Updated",resul);
										}

									})
								}else{
									db.collection('likes').insert({"user_id":decoded._id,"post_id":posts.post_id,"like_count":"1"},function(err,result){
									if(err)
										throw err;
									else{
										res.status(200);
										res.send({
											"message":"Document Inserted",
											"status":true,
											"data":posts
										});
									console.log("Document Inserted")
									}
								})
								}
								// if(!result.length){
								// 								console.log("res1ss",result)

								// 		
								// }
								// else{
								// 	console.log("user_id is",decoded._id);
								// 	console.log("post id is",posts.post_id);
								// 	
								
								// }
								
							}

							})		
						}
				})
        	}
    });
}