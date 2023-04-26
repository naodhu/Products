import Header from "./components/Header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Products from "./components/Product/Products";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <React.Fragment>
      <Header>
        <Header />
      </Header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<AddProduct />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/products/:id" element={<ProductDetail />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
