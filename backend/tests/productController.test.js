const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../model/productModel");

describe("Product controller", () => {
  beforeAll(async () => {
    await mongoose.connect("", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  const sampleProduct = {
    title: "Test product",
    description: "Test description",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: "Test Brand",
    category: "Test Category",
    thumbnail: "https://example.com/thumbnail.jpg",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
  };

  test("should get all products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("products");
  });

  test("should get a product by id", async () => {
    const product = new Product(sampleProduct);
    await product.save();

    const res = await request(app).get(`/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("product");
    expect(res.body.product._id).toEqual(product._id.toString());
  });

  test("should add a new product", async () => {
    const res = await request(app).post("/products").send(sampleProduct);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("product");
    expect(res.body.product.title).toEqual(sampleProduct.title);
  });

  test("should update a product", async () => {
    const product = new Product(sampleProduct);
    await product.save();

    const updatedProduct = {
      ...sampleProduct,
      title: "Updated product",
    };

    const res = await request(app)
      .put(`/products/${product._id}`)
      .send(updatedProduct);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("product");
    expect(res.body.product.title).toEqual("Updated product");
  });

  test("should delete a product", async () => {
    const product = new Product(sampleProduct);
    await product.save();

    const res = await request(app).delete(`/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Product deleted");
    expect(res.body).toHaveProperty("product");
    expect(res.body.product._id).toEqual(product._id.toString());
  });
});
