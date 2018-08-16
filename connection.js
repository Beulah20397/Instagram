var client = require('mongodb').MongoClient,
mongodb	=null;

module.exports =  {
connect: function(dburl, callback) {
    client.connect(dburl,
        function(err, db){
            mongodb = db;
            if(callback) { callback(); }
        });
},
db: function() {
    return mongodb;
},
close: function() {
    mongodb.close();
 }
};	