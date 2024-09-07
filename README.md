# Store API

This is a backend API for an e-commerce store built using **Node.js**, **Express**, and **MongoDB** with **Mongoose** as the ODM (Object Data Modeling). The API allows for filtering, searching, sorting, and pagination of products. It returns JSON responses for all requests.

## Features
- **Filter** products by fields like name, price, company, etc.
- **Search** products by name.
- **Sort** products by fields like price, rating, etc.
- **Pagination** for large datasets.
- **CRUD** operations for products (optional if implemented).

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (via **Mongoose** ODM)
- **dotenv** (for environment variable management)
- **nodemon** (for development)

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.x or later)
- [MongoDB](https://www.mongodb.com/)

### Getting Started
1. Clone the repository:
```bash
git clone https://github.com/abdulnafih27/Store-API.git
cd Store-API
```

2. Install the dependencies:
```bash 
npm install
```

3. Create a .env file in the root of the project and add your MongoDB connection string:
```bash
MONGO_URI=<your-mongodb-connection-string>
```
4. Start the development server:
```bash
npm start
```
- The API will be running at http://localhost:3000.

## API Endpoints

### Product Routes
- GET /api/v1/products - Get all products with filtering, searching, sorting, and pagination.

- Query Parameters:
  - search - Search by product name.
  - category - Filter by category.
  - price[gte], price[lte] - Filter by price range.
  - sort - Sort by price, rating, etc. (e.g., ?sort=price)
  - limit - Number of items per page.
  - page - Pagination page number.