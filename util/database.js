// after npm install --save mongodb
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://mohamedabdelaziz:01282434860m@node-complete-fced0.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
    //   console.log(result);
      console.log("CONNECTED MONGODB ATLAS");
      _db = client.db(); 
      // callback(result);
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 *  checking database found 
 * @return _db object database
 */
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found' ;
}
// module.exports = mongoConnect ;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;