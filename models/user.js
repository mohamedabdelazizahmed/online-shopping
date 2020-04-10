const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; //{items:[]}
    this._id = id;
  }
  static save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /**
   * Relation One To One User Cart
   *
   * @param {Object} product
   */
  addToCart(product) {
    console.log("... addToCart ...");
    // if cart contain certain product already .
    // const cartProduct = this.cart.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });
    // ADD  certain product to cart
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    console.log(updatedCart);
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
}
module.exports = User;
