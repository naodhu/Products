import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const URL = "http://localhost:3001/products";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setProducts(data.products));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const displayProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div>
      <form style={{ width: "70%", margin: "auto" }}>
        <TextField
          onChange={handleSearch}
          fullWidth
          placeholder="Search by product name..."
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </form>
      <ul>
        {displayProducts.map((product, i) => (
          <li key={i}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
