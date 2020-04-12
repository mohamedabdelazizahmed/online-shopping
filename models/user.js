/**
 *  Create Model using mongoose NoSQL
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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

module.exports = mongoose.model("User", userSchema);
