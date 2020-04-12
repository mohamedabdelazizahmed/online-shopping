/**
 *  Create Model using mongoose NoSQL 
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  /** Relation using mongoose */
  // for every product assigned to user 
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User', //name of model,
    required:true
  }
});

module.exports = mongoose.model("Product", productSchema);