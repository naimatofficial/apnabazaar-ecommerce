import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc   Fetch All Prodcuts
// @route  GET /products?
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 3;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	const products = await Product.find({ ...keyword });
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Fetch Single Prodcuts
// @route  GET /products/:id
// @access Public

export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc   Delete Products
// @route  DELETE /products/:id
// @access Private/Admin

export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: "Product removed" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc   Create a Product
// @route  POST /products
// @access Private/Admin

export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: "sample name",
		user: req.user._id,
		price: 0,
		description: "sample desc",
		image: "/images/sample.jpg",
		brand: "sample brand",
		category: "sample category",
		countInStock: 0,
		numOfReviews: 0,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc   Update a Product
// @route  PUT /products/:id
// @access Private/Admin

export const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, image, description, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name || product.name;
		product.price = price || product.price;
		product.image = image || product.image;
		product.description = description || product.description;
		product.brand = brand || product.brand;
		product.category = category || product.category;
		product.countInStock = countInStock || product.countInStock;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc   Create a Product review
// @route  POST /products/:id/reviews
// @access Private

export const createdProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (alreadyReviewed) {
			res.status(404).json({ message: "Product already reviewed!" });
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => acc + item.rating, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc   get top rated products
// @route  GET /products/top
// @access Public

export const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(4);

	res.json(products);
});
