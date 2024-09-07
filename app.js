require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const products = require('./routes/products'); 

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


//Middlewares
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products">Products Page</a>');
});

app.use('/api/v1/products', products)


//Product routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening to Port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();