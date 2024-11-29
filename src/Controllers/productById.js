const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://root:password@localhost:27017";

async function getProductById (req, res) {
    try {
      const connection = await MongoClient.connect(url);
      const productId = ObjectId.createFromHexString(req.query.id);
      const filter = {
        _id: productId,
      };
  
      console.log(filter);
      console.log();
  
      const product = await connection
        .db("furniture-store")
        .collection("products")
        .findOne(filter);
  
      res
        .status(200)
        .json({ mesage: "Successfully retrieved product", data: product });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Unexpected Error", data: [], error: error.toString() });
    }
  }

  module.exports = {
    getProductById
  }