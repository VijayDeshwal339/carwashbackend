const express = require('express');
const mongoose = require("mongoose");
const Connectdb = require("./src/db/ConnectDb");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();
const route = require('./src/Route/routes');

dotenv.config({
    path:".env",
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use('/api/v1',route);
Connectdb();

app.listen(process.env.PORT ,() =>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Nj7tjqhP0udjIUMV