const ObjectId = require('mongodb').ObjectId; 
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
var path = require('path');
const mongodb = require('./connection.js');	

exports.createPost = function(req,res,callback){
	var posts = {
		"post"  :req.body.post,
		"post_name" : req.body.post_name,
		"location" : req.body.location,
		"status" : "1" 
	};
	// console.log("files are",req.files);
	// console.log("array is  are",req.files[0]);

	var token = req.headers['x-access-token'];
 	jwt.verify(token, 'secret',function(err,decoded){
        if(err){
            console.log("error is",err)
        }else{

            console.log("decoded email is",decoded._id);
            console.log("file is",req.files)
           // console.log("extension is",ext);
        	if(posts.post.length == 0 && req.files == ""){
        		
				res.status(400);
				res.send({
					"message":"Post is Empty",
					"status" :false
				});
				console.log("Fields Empty");
			}
			else{
				console.log("fdgfg", mongodb.db());
				const query = mongodb.db("instamongodb");
				query.collection('InstaUsers').findOne({
					$or: [{ '_id' : decoded._id },{ 'email': decoded.email }]
				},function(err,result){
					if(err)
						throw err;
					else{
						if(!result){
							res.status(400).send({
								"message":"User Does Not Exist",
								"status" : false,
							})
						}
						else
						{
							query.collection('instaPost').insert({"post":posts.post,"post_name":posts.post_name,"location":posts.location,"status":posts.status,"user_id":decoded._id},function(err,result){
							if(err)
								throw err;
							else{
								if(!(req.files.length === 0)){
									var ext = req.files[0].originalname.split('.')[1];
									var imagepath =posts.post_name+Date.now()+"."+ext;
									console.log("file is",req.files);
									if((ext === "jpeg") || (ext === "png") || (ext === "jpg") || (ext === "gif")){
										var post_image_id = result.ops[0]._id.toString();
										console.log("image post id",ObjectId(post_image_id))
										console.log("image post id type", typeof ObjectId(post_image_id).toString())
										query.collection('imagePosts').insert({"post_id":post_image_id,"image_path":imagepath},function(err,resul){
										if(err)
											throw err;
										else
										{
											res.status(200).send({
												"message":"Document Inserted with Image",
												auth:true,
												"data":resul
											})
										}
										})
									}
									else if(ext === "mp4"){
										var post_image_id = result.ops[0]._id.toString();
										const path = req.files[0].path;
										const stat = fs.statSync(path)
  										const fileSize = stat.size
 										const range = req.body.range
										console.log("extension is",range);
  										if (range) {
										const parts = range.replace(/bytes=/, "").split("-")
										console.log("name of file is",parts)
    									const start = parseInt(parts[0], 10)
    									const end = parts[1] 
    									  ? parseInt(parts[1], 10)
    									  : fileSize-1
    									const chunksize = (end-start)+1

    									const file = fs.createReadStream(path, {start, end})

    									const head = {
    									  'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    									  'Accept-Ranges': 'bytes',
    									  'Content-Length': chunksize,
    									  'Content-Type': 'video/mp4',
    									}
    									// res.writeHead(206, head);
    									file.pipe(res);
    									query.collection('imagePosts').insert({"post_id":post_image_id,"image_path":path},function(err,resul){
										if(err)
											throw err;
										else
										{
											res.status(200);
											res.send({
												"message":"Document Inserted with Image",
												auth:true,
												"data":resul
											})
											console.log("Post Inserted with Video")
										
  									} 
  									})

									}else {
    									const head = {
    									  'Content-Length': fileSize,
    									  'Content-Type': 'video/mp4',
    									}
    									res.writeHead(200, head)
    									fs.createReadStream(path).pipe(res)
    									console.log("head is",head)
								}
							}
							}
								else{
									res.status(200);
									res.send({
									"message":"Document Inserted without Image",
									"status":true,
									"data":result.ops
								});
								}
								console.log("Document Inserted")
							}

							})
							}			
						}
				})
				
			}
        }
    });
}