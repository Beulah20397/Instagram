var mongodb = require('mongodb').MongoClient;

exports.connection = function(req,res,callback){
	const url = "mongodb://beulah:Beulah123!@ds117422.mlab.com:17422/instamongodb";

	mongodb.connect(url,function(err,database){
		if(err){
			throw err;
		}
		else 
		{
			return database;
		}
	})
}
