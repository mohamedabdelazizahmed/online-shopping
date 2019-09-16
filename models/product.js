const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

  // save() {
  //   console.log( path.dirname(process.mainModule.filename));
  //   const p = path.join(
  //     path.dirname(process.mainModule.filename),
  //     'data',
  //     'products.json'
  //   );
  //   console.log(path.dirname(process.mainModule.filename));
  //   fs.readFile(p, (err, fileContent) => {
  //     let products = [];
  //     if (!err) {
  //       products = JSON.parse(fileContent);
  //     }
  //     products.push(this);
  //     fs.writeFile(p, JSON.stringify(products), err => {
  //       console.log(err);
  //     });
  //   });
  // }

  // static fetchAll(cb) {
  //   const p = path.join(
  //     path.dirname(process.mainModule.filename),
  //     'data',
  //     'products.json'
  //   );
  //   fs.readFile(p, (err, fileContent) => {
  //     if (err) {
  //       cb([]);
  //     }
  //     cb(JSON.parse(fileContent));
  //   });
  // }