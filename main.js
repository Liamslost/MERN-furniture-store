const port = 3001;
const hostname = "127.0.0.1";
const express = require("express");
const url = "mongodb://root:password@localhost:27017";
const { MongoClient, ObjectId } = require("mongodb");
const {
  getAllCategories,
} = require("./src/Controllers/allCategoriesController");
const {
  getAllProductsByCategory,
} = require("./src/Controllers/allProductsByCategory");
const app = express();
const cors = require("cors");
const { getProductById } = require("./src/Controllers/productById");

const databaseDetails = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "robot_stores",
};

app.use(cors());
app.use(express.json());

app.get("/categories", getAllCategories);
app.get("/products", getAllProductsByCategory);

app.get("/product", getProductById);

app.listen(port);
