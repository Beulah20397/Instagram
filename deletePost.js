const ObjectId = require('mongodb').ObjectId; 
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
var path = require('path');
const mongodb = require('./connection.js');	

	

exports.deletePost = function(req,res,callback){
	var posts = {
		"post_id"  :req.body.post_id
	};
	var token = req.headers['x-access-token'];
	//console.log(req.headers);
	console.log("req.body ",req.body)
	console.log("ObjectId",ObjectId)
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{
        		console.log("fdgfg", mongodb.db());
				const query = mongodb.db("instamongodb");
				console.log("decoded email is",decoded._id);
				console.log("Post id is",posts);
				query.collection('InstaUsers').findOne({
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
							console.log("post id",posts.post_id)
							query.collection('instaPost').findOne({"_id":ObjectId(posts.post_id)},function(err,result){
								console.log("result is",result)
							if(err)
								throw err;
							else{
								if(result.status == 0){
									res.status(400)
									res.send({
										"message" : "Document is already deleted",
										"status" : false,
										"data" : result.status
									});
								}
								else{
									query.collection('instaPost').findOneAndUpdate({"_id":ObjectId(posts.post_id)},{$set:{"status":"0"}},function(er,ress){
										if(er){
											throw er;
										}
										else{
											res.status(200).send({
												"message":"Document deleted",
												auth:false,
												"data":ress.value.status
											})
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