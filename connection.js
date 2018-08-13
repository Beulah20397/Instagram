var mongodb = require('mongodb').MongoClient;

exports.connection = function(req,res,callback){
	const url = "mongodb://BeulahBabu:Beulah123!@ds117422.mlab.com:17422/instamongodb";

	mongodb.connect(url,{useNewUrlParser: true},function(err,database){
		if(err){
			throw err;
		}
		else 
		{
			console.log("database",database)
			var db = database.db('instamongodb');
			console.log("Switched to "+db.databaseName+" database");
		}
	})
}
