import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running");
});

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(
	PORT,
	console.log(`Server is Running on ${process.env.NODE_MODE} mode in ${PORT} `)
);
