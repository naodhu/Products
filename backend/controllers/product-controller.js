const Product = require("../model/productModel");

const getAllProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    console.log(err);
  }
  if (!products) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ products });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json({ product });
};

const addProduct = async (req, res, next) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;
  let product;
  try {
    product = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images,
    });
    await product.save();
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(500).json({ message: "Could not add product" });
  }

  // this line is to converet the product instance to an object
  const createdProduct = await Product.findById(product._id);

  // Rerurn the product object in the response
  return res.status(201).json({ product: createdProduct });
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;

  try {
    let product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res
      .status(500)
      .json({ message: "Could not delete product with the ID" });
  }
  return res.status(200).json({ message: "Product deleted", product });
};

exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getById = getById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

exports.getAllProducts = getAllProducts;
