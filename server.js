import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "../backend/db/connectMongoDB.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse request bodies
app.use(express.json()); // Parses JSON req.body 
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);


// Start the server after connecting to the database
connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process if DB connection fails
});

