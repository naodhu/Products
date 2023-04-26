import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./ProductCard.css";
import axios from "axios";

const Product = (props) => {
  const history = useNavigate();
  const {
    _id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    // images,
  } = props.product;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3001/products/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/products"));
  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill(<FontAwesomeIcon icon={faStar} />)}
        {Array(halfStars).fill(<FontAwesomeIcon icon={faStarHalfAlt} />)}
        {Array(emptyStars).fill(
          <FontAwesomeIcon icon={faStar} className="empty" />
        )}
      </>
    );
  };

  return (
    <div className="product-card">
      <img src={thumbnail} alt={title} className="product-image" />
      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
        <div className="price-and-discount">
          <span className="product-price">${price.toFixed(2)}</span>
          {discountPercentage > 0 && (
            <span className="discount-percentage">-{discountPercentage}%</span>
          )}
        </div>
        <div className="rating-and-stock">
          <div className="product-rating">{renderStars()}</div>
          <span className="product-stock">{stock} in stock</span>
        </div>
        <div className="brand-and-category">
          <span className="product-brand">Brand: {brand}</span>
          <span className="product-category">Category: {category}</span>
        </div>
        <Button LinkComponent={Link} to={`/products/${_id}`}>
          <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} /> Edit
        </Button>
        <Button onClick={deleteHandler}>
          {" "}
          <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />{" "}
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Product;
