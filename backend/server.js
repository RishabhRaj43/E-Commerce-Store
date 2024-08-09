//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//utils
import connectDB from "./config/db.js";

//routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
connectDB();

// Routes
app.use("/api/users",userRoutes)


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
