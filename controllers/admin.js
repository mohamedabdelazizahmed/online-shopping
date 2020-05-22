const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // working on Route Protection
  if (!req.session.isLoggedIn) {
    return redirect('/login');
  }
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // isAuthenticated: req.session.isLoggedIn
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
  console.log(req.user);
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user._id  // For every product save by certain  user
  });
  product
    .save()
    .then((result) => {
      console.log("CREATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode != "true") {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
        // isAuthenticated: req.isLoggedIn
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

  Product.findById(prodId)
    .then((product) => {
      product.title = updateTitle;
      product.price = updatePrice;
      product.description = updateDescription;
      product.imageUrl = updateImageUrl;

      return product.save();
    })
    .then((result) => {
      console.log("... UPDATED PRODUCT ...");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findOneAndRemove(prodId)
    .then(() => {
        console.log("DESTROYED PRODUCT");
        res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

};
exports.getProducts = (req, res, next) => {
  Product.find()
    //.select('title price imageUrl -_id')   //which field select or unselect
    // .populate('userId','name')    // fetch relation data like user using userId
    .then((products) => {
      console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        // isAuthenticated: req.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};
