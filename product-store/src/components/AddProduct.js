import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./ProductForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const history = useNavigate();
  // inputs state here to store the data from the form
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  // handle change function here to update the state of the inputs object when the user types in the form
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }; // handle change function here

  // send request function here to send the data to the server
  const sendRequest = async () => {
    axios
      .post("http://localhost:3001/products", {
        title: String(inputs.title),
        description: String(inputs.description),
        price: Number(inputs.price),
        discountPercentage: Number(inputs.discountPercentage),
        rating: Number(inputs.rating),
        stock: Number(inputs.stock),
        brand: String(inputs.brand),
        category: String(inputs.category),
        thumbnail: String(inputs.thumbnail),
      })
      .then((res) => res.data);
  };
  // handleSubmit function here to send the data to the server when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/products"));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <TextField
        value={inputs.title}
        type="text"
        label="Title"
        onChange={handleChange}
        name="title"
        required
      />
      <TextField
        type="text"
        label="Description"
        name="description"
        value={inputs.description}
        onChange={handleChange}
        required
      />
      <TextField
        type="number"
        label="Price"
        name="price"
        value={inputs.price}
        onChange={handleChange}
        required
      />
      <TextField
        type="number"
        label="Discount Percentage"
        name="discountPercentage"
        value={inputs.discountPercentage}
        onChange={handleChange}
      />
      <TextField
        type="number"
        label="Rating"
        name="rating"
        value={inputs.rating}
        onChange={handleChange}
        required
      />
      <TextField
        type="number"
        label="Stock"
        name="stock"
        value={inputs.stock}
        onChange={handleChange}
        required
      />
      <TextField
        type="text"
        label="Brand"
        name="brand"
        value={inputs.brand}
        onChange={handleChange}
        required
      />
      <TextField
        type="text"
        label="Category"
        name="category"
        value={inputs.category}
        onChange={handleChange}
        required
      />
      <TextField
        type="text"
        label="Image URL"
        name="thumbnail"
        value={inputs.thumbnail}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">
        Add Product
      </Button>
    </form>
  );
};

export default AddProduct;
