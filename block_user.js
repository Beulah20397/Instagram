const mongodb = require('./connection.js');
exports.block_user = function(req,res){
// user_id
// post(video/audio/text/image)
// post_name // #tags
// location
// status

	var follows = {
	"user_id" : req.body.follow_id,//logged in user
	"follower_id":req.body.follower_id,//following user
	"block_status" : 0
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
				console.log("fdgfg", mongodb.db());
				const query = mongodb.db("instamongodb");
		var following = db.collection('InstaUsers').find(follows.follow_id,function(err,result){
			if(err) throw err;
			else{
				var followers = db.collection('InstaUsers').find(follows.follower_id);
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
					query.collection('follows').findOneAndUpdate({follows.follower_id},function(err,res){
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
