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
    return db
      .collection("products")
      .insertOne(this) // insertOne fun mongodb take js object like insertOne({book:'',price:12})
      .then((result) => {
        console.log("PRODUCT SAVING");
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("Fetching all Products");
        // console.log(result);
        return products;
      })
      .catch((err) => {console.log(err)});
  }
}
module.exports = Product;
