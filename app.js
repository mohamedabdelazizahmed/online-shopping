const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// when using pkg  mysql2
const db = require("./util/database");
const sequelize = require("./util/database");
// Define Models To make Relation
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// when application run and using pkg mysql2
// db.execute("SELECT * FROM products")
//     .then((result) => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


// in pkg sequelize define Relation User has Many Product
Product.belongsTo(User,{constraints:true ,onDelete:'CASCADE'});
User.hasMany(Product);

// in pkg sequelize using sync to convert any model to tables in DB
sequelize
  .sync({force:true}) //{force:true} to override table when when created
  .then((result) => {
    // show the Query in server 
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
