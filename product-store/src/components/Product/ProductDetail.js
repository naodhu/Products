import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({});
  const id = useParams().id; // get the id from the url
  useEffect(() => {
    // fetch the product data from the backend using the id
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3001/products/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.product));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3001/products/${id}`, {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/products"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit} className="product-form">
          <TextField
            value={inputs.title}
            type="text"
            onChange={handleChange}
            name="title"
            required
          />
          <TextField
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
          <TextField
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            required
          />
          <TextField
            type="number"
            name="discountPercentage"
            value={inputs.discountPercentage}
            onChange={handleChange}
          />
          <TextField
            type="number"
            name="rating"
            value={inputs.rating}
            onChange={handleChange}
            required
          />
          <TextField
            type="number"
            name="stock"
            value={inputs.stock}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="brand"
            value={inputs.brand}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="thumbnail"
            value={inputs.thumbnail}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Edit Product
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProductDetail;
