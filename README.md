# Products

## Description

This project is a web application that allows you to create, read, update and delete products. The project was developed using React, Node.js, Express and MongoDB.

I used the given API " https://fakestoreapi.com/products " to get the products and I created a backend to store the products in a database. The backend has the following routes:
`"products /"`, `"products /: id"`, `"products /: id / update"` and `"products /: id / delete"`.

- The first route is used to get all the products, the second one is used to get a product by id, the third one is used to update a product by id and the last one is used to delete a product by id.
- The frontend has the following pages: Home, Create Product, Update Product and Delete Product.
- The View Product button shows all the products that are in the database.
- The Add Product button allows you to add a new product.
- The Edit Product button allows you to edit a product.
- The Delete Product button allows you to delete a product.

## Installation

There are two folders called Backend and product-store. The first folder is the backend of the project and the second one is the frontend. To run the project you need to run the backend first and then the frontend. To run the backend you need to run the following commands:

```bash
cd Backend
npm install
npm start
```

To run the frontend you need to run the following commands:

```bash
cd product-store
npm install
npm start
```

## Database

The database used in this project is MongoDB. To connect to the database you need to create a .env file in the Backend folder and add the following line:

```bash
MONGODB_URI = mongodb://localhost:27017/products
```

## Tests and Documentation

To run the tests you need to run the following commands:

```bash
cd Backend
npm install
cd tests
npm test
```

## Usage

To use the project you need to run the backend and then the frontend. Once you run the frontend you will see the following page:

![image](https://user-images.githubusercontent.com/54969894/134786845-9b8b7b0b-2b0b-4b0f-8b0a-9b0b8b0b0b0b.png)

In this page you can see all the products that are in the database. You can create a new product by clicking on the button "Add Product" and you will see the following page:

![image](https://user-images.githubusercontent.com/54969894/134786882-8b0b0b0b-0b0b-4b0b-8b0b-0b0b0b0b0b0b.png)

In this page you can create a new product by filling the form and clicking on the button "Create Product". You can also update a product by clicking on the button "Update" and you will see the following page:

![image](https://user-images.githubusercontent.com/54969894/134786911-0b0b0b0b-0b0b-0b0b-8b0b-0b0b0b0b0b0b.png)

In this page you can update the product by filling the form and clicking on the button "Update Product". Finally, you can delete a product by clicking on the button "Delete" and you will see the following page:

![image](https://user-images.githubusercontent.com/54969894/134786933-0b0b0b0b-0b0b-0b0b-8b0b-0b0b0b0b0b0b.png)

In this page you can delete the product by clicking on the button "Delete Product".

## Technologies and Features Used

- React
- Node.js
- Express
- MongoDB
- Mongoose
- Axios
- React Router
- React Bootstrap
- React Icons
- Reactstrap
- Material UI
- Styled Components

## Dependencies

- Axios
- Cors
- Dotenv
- Express
- Mongoose
- Nodemon
