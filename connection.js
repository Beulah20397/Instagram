var mongodb = require('mongodb').MongoClient;

exports.connection = function(req,res,callback){
	const url = "mongodb://localhost:27017/InstaMongoDb";

	mongodb.connect(url,{useNewUrlParser: true},function(err,database){
		if(err){
			throw err;
		}
		else 
		{
			db = database.db('InstaMongoDb');
			console.log("Switched to "+db.databaseName+" database");
		}
	})
}
