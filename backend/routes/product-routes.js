const express = require("express");
const router = express.Router();
const productsController = require("../controllers/product-controller");

const Product = require("../model/productModel");

// GET /products
router.get("/", productsController.getAllProducts);
router.post("/", productsController.addProduct);
router.get("/:id", productsController.getById);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
