import mongoose from "mongoose";
import * as dotenv from "dotenv";

import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

// destory the data from database
const destoryData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("DATA DESTORY!");
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

// import the data from database
const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);

		// take the first value of as an admin (default)
		const adminUser = createdUsers[0]._id;

		// put the products and adminUser into sampleProduct array
		const sampleProduct = products.map((products) => {
			return { ...products, user: adminUser };
		});

		await Product.insertMany(sampleProduct);
		console.log("DATA IMPORTED!");
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

// process.argv :: it is property that holds a array of command-line values

if (process.argv[2] === "-d") {
	destoryData();
} else {
	importData();
}
