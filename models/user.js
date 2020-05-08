/**
 *  Create Model using mongoose NoSQL
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
userSchema = new Schema({

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        // ref of product 
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

/**
 *  ADD TO CART FUN IN USER MODEL 
 */
userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  // checking if product already in cart
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id, // different in mongodb store id
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  // different with mongodb not updated manually 
  this.cart = updatedCart;
  return this.save(); // updated cart
};
/**
 *  REMOVE PRODUCT FROM CART  FUN
 * @returns Promise
 */
userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
