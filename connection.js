var mongodb = require('mongodb').MongoClient;
	const url = "mongodb://beulah:Beulah123@ds117422.mlab.com:17422/instamongodb";
	console.log("url is",url)

exports.connection = mongodb.connect(url,function(err,database){
		let db;
		if(err){
			console.log('errrr'. err);
			throw err;
		}
		else 
		{
			db = database.db('instamongodb')
			console.log("runnling live on 8080",database, "*********************************************************");
			
		}
		
	})