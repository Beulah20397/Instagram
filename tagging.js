const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const mongodb = require('mongodb').MongoClient;

let db;
var url = "mongodb://beulah:Beulah123@ds117422.mlab.com:17422/instamongodb"
mongodb.connect(url, (err, client) => {
	 db = client.db('instamongodb');
})
exports.tagging = function(req,res,callback){
	console.log("req.body",req.body)
	var tagging_data ={
		"post_id"  :req.body.post_id,
		"tag_id" :req.body.tag_id
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
							var arr = tagging_data.tag_id.split(",");
							for(var i = 0;i<arr.length;i++){
								if(decoded._id === arr[i]){
									console.log("same user",arr[i]);
								}else if(arr[i] === arr[i+1]){
									console.log("cannot tag same id multiple times",arr[i])
								}
								else{
									var tagged_ids = {
										"post_id" : tagging_data.post_id,
										"tag_id" : arr[i]
									}
									console.log("ids are",tagged_ids);
									db.collection('tags').find({$and: [{ 'post_id' : tagging_data.post_id },{ 'tag_id': arr[i]}]}).toArray(function(err,result){
										if(err)
											throw err;
										else{
											if(result.length == 0){
												db.collection('tags').insert({"post_id":tagging_data.post_id,"tag_id":tagging_data.tag_id},function(err,result){
													if(err)
														throw error
													else
														res.status(200).send({
															"message" : "user tagged",
															auth:true,
															"data":result
														})
												})
											}
											else{
												res.status(400).send({
															"message": "users alread tagged",
															auth : false,
															data : result
														})
											}
										}

									})
								}
							}	
						}
				})
        	}
    });
}




// {
// 	"post_id":"5b56d22d787a821e193ac298",
// 	"tag_id" :"5b55ba0d68391c530fcb12ab,5b55ab8b4c4ef74673d3ada5"
// }