import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" className="product-container">
        <Paper elevation={5} className="product-paper">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="product-title">
                Add Product
              </Typography>
              <Typography variant="subtitle1" className="product-introduction">
                Boost your store by adding a new product. Fill in the details
                below and watch your store grow!
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Product
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddShoppingCart />}
                    onClick={() => history("/products")}
                  >
                    Back to Products
                  </Button>
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default AddProduct;
