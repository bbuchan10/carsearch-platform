import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import makesRouter from './src/routes/makes.js';
import modelsRouter from './src/routes/models.js';

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/carsearch";



const app = express();

// Middleware
app.use(express.json());

// Mongo connection
await mongoose.connect(mongoDB);

// Routes
app.use('/api/v1/makes', makesRouter);
app.use('/api/v1/models', modelsRouter);

// Start server

// Listen for requests
ViteExpress.listen(app, 5050, () =>
    console.log("Server is listening on port 3000...")
);