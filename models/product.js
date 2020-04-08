const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    // connection db to interact with db
    const db = getDb();
    db.collection("products")
      .insertOne(this) // insertOne fun mongodb take js object like insertOne({book:'',price:12})
      .then((result) => {
        console.log("PRODUCT SAVED");
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
}
module.exports = Product;