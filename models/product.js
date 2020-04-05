const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }
  static findById(id){
    return db.execute("SELECT * FROM products WHERE products.id = ?",[id]);

  }
  save() {
    return db.execute(
      "INSERT INTO products (title,price,imageUrl,description) VALUES (? ,? ,? ,? )",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  /////////////////////////////////////   OPERATION USING FILE ////////////////////////////////////////////
  saveByFile() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static fetchAllByFile(cb) {
    getProductsFromFile(cb);
  }
  /**
   * Get Detail For product
   * @param {string} id
   * @param {*} cb callback fun run after get product by using id
   */
  static findByIdByFile(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
  static deleteByIdByFile(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
