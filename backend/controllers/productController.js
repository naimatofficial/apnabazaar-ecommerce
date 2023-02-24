import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc   Fetch All Prodcuts
// @route  GET /products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc   Fetch Single Prodcuts
// @route  GET /products/:id
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	if (product) {
		res.json(product);
	} else {
		res.status(404).json({ message: "Prodcut not found!" });
	}
});
