const mongodb = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;

	
exports.listPost = function(req,res,callback){
	var user_id  = req.body.user_id;
	var token = req.headers['x-access-token'];
	console.log(req.headers);
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{
				console.log("decoded id is",decoded._id);
				console.log("user id is",user_id);
				db.collection('InstaUsers').findOne({
					$or: [{ '_id' : decoded._id },{ 'email': decoded.email }]
				},function(err,result){
					if(err){
						res.send({
							"message" :err
						})
						throw err;
					}
					else{
						if(!result){
							res.status(400).send({
								"message":"User Does Not Exist",
								"status" : false,
							})
						}
						else
						{
							var idd = {user_id:-1};
							console.log("user id is",idd);
							var imagepath = {};
							var listPostResult = {};
							var imagePostResult = {};
							db.collection('instaPost').find({"user_id":decoded._id,"status":"1"}).sort({"_id":-1}).toArray(function(err,resul){
								if(err)
									throw err;
								else{
									for(var i=0;i<resul.length;i++){
										
									// console.log("listPostResult",listPostResult)

										if(resul[i]._id){
											listPostResult[i] ={
												"post" : resul[i].post,
												"post_name" : resul[i].post,
												"location" : resul[i].location
											}
											var resultId = resul[i]._id.toString();
											db.collection('imagePosts').find({"post_id":resultId}).toArray(function(err,ressw){
												if(err) throw err;
												else{
													for(var j = 0;j<ressw.length;j++){
														if (ressw.length) {
															imagePostResult = {
																"image_path" : ressw[j].image_path
															}


													}
													}
													
													
													// for(var j = 0;j<ressw.length;j++){
													// 	console.log("posts are",ressw.length);
													// 	// if(ressw.length)

													// // console.log("imagepath",ressw[j].image_path)	
													// }
													
												}
											})
											//console.log("listPostResult",listPostResult)
										}
									}

									if(result.status == 2){
										res.status(400);
										res.send({
											"message":"Document is Archived",
											"status":false,
											"data":resul
										});
										console.log("Document is Archived");
									}
									else if(result.status == 0){
										res.status(400).send({
											"message" : "Document is deleted",
											"status" : false,
											"data" : resul
										});
									}
									else if(!(decoded._id === user_id))
									{
										res.status(400).send({
											"message" : "User id does not match",
											"status" :false,
											
										})
									}
									else{
										res.status(200).send({
											"message":"Document is:",
											auth:true,
											"data":resul
											})
										}
								}

							}			
						)}
						}
				})
        	}
    });
}