import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// This is show the api calls in the console
if (process.env.NODE_MODE === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.use("/config/paypal", (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_MODE === "production") {
	app.use(express.static(path.join(__dirname, "frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running");
	});
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(`Server is Running on ${process.env.NODE_MODE} mode in ${PORT} `)
);
