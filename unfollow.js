const mongodb = require('mongodb').MongoClient;


const url = "mongodb://localhost:27017/InstaMongoDb";
const connection = require('./connection.js');


exports.likes = function(req,res){
// user_id
// post(video/audio/text/image)
// post_name // #tags
// location
// status

	var follows = {
	"user_id" : req.body.user_id,//whom user id is following
	"follower_id":req.body.follower_id,//logged in user
	"unfollow" : 2
};
	const likes = Postlikes.like;
	else if(!posts.user_id){
		res.status(400);
		res.send({
			"message":"user_id Empty",
			"status" :false
		});
		console.log("user_id Empty");
	}

	else{
		var following = db.collection('InstaUsers').find(follows.follow_id,function(err,result){
			if(err) throw err;
			else{
				var followers = db.collection('InstaUsers').find(follows.follower_id,fu);
				if(!following){
					res.status(400);
					res.send({
						"message":"User not found",
						auth : false
					});
					console.log("User not found");
				}
				else if(!followers){
					res.status(400);
					res.send({
						"message" : "User not found",
						auth : false
					});
					console.log("User Not found");
				}
				else
				{
					db.collection('follows').findOneAndUpdate({follows.follower_id},function(err,res){
					if(err)
						throw err;
					else{
						res.status(200);
						res.send({
							"message":"Successfully Blocked",
							"status":true,
							"data":res
						});
						console.log("Successfully BLocked")
					}

				})
				}
			}
		});
		
	}

}
