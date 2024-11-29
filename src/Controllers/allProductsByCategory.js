const { MongoClient } = require("mongodb");
const url = "mongodb://root:password@localhost:27017";

async function getAllProductsByCategory (req, res) {
    try {
      const connection = await MongoClient.connect(url);
      const categoryId = Number(req.query.cat);
      const filter = {
          category_id: categoryId,
      };
      const products = await connection
        .db("furniture-store")
        .collection("products")
        .find(filter)
        .project({ _id: 0, id: "$_id", price: 1, stock: 1, color: 1 })
        .toArray();
        
      res
        .status(200)
        .json({ mesage: "Successfully retrieved categories", data: products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unexpected Error", data: [], error: error.toString() });
    }
  }

  module.exports = { getAllProductsByCategory };