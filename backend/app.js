const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const connectDatabase = require("./database");
const router = require("./routes/product-routes");
const Product = require("./model/productModel");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../product-store/build")));

app.use("/products", router); // localhost:localhost:3001/products

const PORT = process.env.PORT || 3001;

async function fetchAndStoreProducts() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;

    // Remove all products from the database before adding new ones
    await Product.deleteMany({});

    // Insert the fetched products into the database
    await Product.insertMany(products);

    console.log("Successfully fetched and stored products.");
  } catch (error) {
    console.error("Error fetching and storing products:", error);
  }
}

connectDatabase().then(() => {
  fetchAndStoreProducts();
});

// Catch-all route to handle all other requests and return the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../product-store/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
