const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // Saved using pkg sequelize by create fun also have build fun create manually
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode != "true") {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updateTitle;
      product.price = updatePrice;
      product.imageUrl = updateImageUrl;
      product.description = updateDescription;
      // save in sequelize to save data backed in db 
      return product.save();
    })
    .then(result => {
      console.log("UPDATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
  
};
exports.postDeleteProduct = (req, res, next) => {};
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//////////////////////////////////// MySql2 pkg Handling /////////////////
exports.getAddProductMySql2 = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.postAddProductMySql2 = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProductMySql2 = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode != "true") {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProductMySql2 = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updateTitle,
    updateImageUrl,
    updateDescription,
    updatePrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProductMySql2 = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
exports.getProductsMySql2 = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

//////////////////////////////////////////// CONTORLER BY FILE //////////////////////////////////////////
exports.getAddProductByFile = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // formsCSS: true,
    // productCSS: true,
    // activeAddProduct: true
  });
};

exports.postAddProductByFile = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProductByFile = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode != "true") {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProductByFile = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updatePrice = req.body.price;
  const updateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updateTitle,
    updateImageUrl,
    updateDescription,
    updatePrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProductByFile = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
exports.getProductsByFile = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
