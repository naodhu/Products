const request = require("supertest");
const express = require("express");
const productRoutes = require("../routes/product-routes");
const Product = require("../model/productModel");

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

// jest.mock is used to mock the module
jest.mock("../model/productModel");

// this code is used for mocking the model methods
describe("Product Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test the controller methods here using the mocked model methods
  // this is the test for the get all products method.
  test("should get all products", async () => {
    const products = [{ _id: "1", title: "Product 1" }];
    Product.find.mockResolvedValue(products);

    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ products });
  });

  // this is the test for the get product by ID method.
  test("should get product by ID", async () => {
    const product = { _id: "1", title: "Product 1" };
    Product.findById.mockResolvedValue(product);

    const response = await request(app).get("/products/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ product });
  });

  // this is the test for the add product method.
  test("should add a product", async () => {
    const newProduct = {
      title: "Product 1",
      description: "Test description",
    };
    const savedProduct = { _id: "1", ...newProduct };
    Product.prototype.save.mockResolvedValue(savedProduct);
    Product.findById.mockResolvedValue(savedProduct);

    const response = await request(app).post("/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ product: savedProduct });
  });

  // this is the test for the update product method.
  test("should update a product", async () => {
    const updatedProduct = {
      _id: "1",
      title: "Updated Product 1",
      description: "Updated description",
    };
    Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    const response = await request(app).put("/products/1").send(updatedProduct);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  });

  // this is the test for the delete product method.
  test("should delete a product", async () => {
    const deletedProduct = { _id: "1", title: "Product 1" };
    Product.findByIdAndRemove.mockResolvedValue(deletedProduct);

    const response = await request(app).delete("/products/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Product deleted",
      product: deletedProduct,
    });
  });
});
