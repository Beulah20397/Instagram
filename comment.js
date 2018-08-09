const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const url = "mongodb://localhost:27017/InstaMongoDb";
const connection = require('./connection.js');


exports.comment = function(req,res,callback){
	var comment_data ={
		"post_id"  :req.body.post_id,
		"comment" :req.body.comment
	};

	var token = req.headers['x-access-token'];
	console.log(req.headers);
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{
				console.log("decoded email is",decoded._id);
				//console.log("Post id is",posts);
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
							db.collection('comment').insert({"user_id":decoded._id,"post_id":comment_data.post_id,"comment":comment_data.comment,"status":"1"},function(err,result){
								if(err)
									throw err;
								else
								{
									res.status(200).send({
										"message" : "you commented",
										auth :true,
										"data" : result
									})
								}
							})	
						}
				})
        	}
    });
}