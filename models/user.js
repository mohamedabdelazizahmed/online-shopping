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
    console.log(this.cart);
    /** if cart contain certain product already . */
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    // if item already exist
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };

    /**  ADD  certain product to cart */
    // const updatedCart = { items: [{ ...product, quantity: 1 }] };
    // const updatedCart = {
    //   items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    // };

    console.log(updatedCart);
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  /**
   * get cart items
   */
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        console.log("...CART PRODUCT ...");
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });
  }
  /**
   * Delete Item From Cart
   * @param {String} productId
   */
  deleteItemFromCart(productId) {
    //
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: [...updatedCartItems] } } }
      );
  }
}
module.exports = User;
