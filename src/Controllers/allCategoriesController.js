const { MongoClient } = require("mongodb");
const url = "mongodb://root:password@localhost:27017";

async function getAllCategories(req,res) {
    try {
      const connection = await MongoClient.connect(url);

      const products = await connection
        .db("furniture-store")
        .collection("products");

      const categories = await products.distinct("category");
      let countedCategories = [];

      if (!categories) {
        res.json({ message: "Categories does not exist" });
      } else {
        for (category of categories) {
          const count = await products.countDocuments({ category: category });
          const productId = await products.findOne(
            { category: category },
            { projection: { _id: 0, category_id: 1 } }
          );
          countedCategories.push({
            id: productId.category_id,
            name: category,
            products: count,
          });
        }
      }
      res.status(200).json({
        mesage: "Successfully retrieved categories",
        data: countedCategories,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Unexpected Error",
          data: [],
          error: error.toString(),
        });
    }
  };


module.exports = { getAllCategories };
