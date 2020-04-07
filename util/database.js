// after npm install --save mongodb
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://mohamedabdelaziz:01282434860m@node-complete-fced0.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then((result) => {
    //   console.log(result);
      console.log("CONNECTED MONGODB ATLAS");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongoConnect ;