import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" className="product-detail-container">
        <Paper elevation={5} className="product-detail-paper">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="product-detail-title">
                Edit Product
              </Typography>
              <Typography
                variant="subtitle1"
                className="product-detail-introduction"
              >
                Update the product details to keep your store up to date.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {inputs && (
                <form onSubmit={handleSubmit} className="product-detail-form">
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
                  <Stack direction="row" spacing={2}>
                    <Button type="submit" variant="contained" color="primary">
                      Edit Product
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Edit />}
                      onClick={() => history("/products")}
                    >
                      Back to Products
                    </Button>
                  </Stack>
                </form>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default ProductDetail;
