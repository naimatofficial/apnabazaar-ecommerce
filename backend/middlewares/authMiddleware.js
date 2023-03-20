import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// get the 2nd value of token
			// 1st index: Bearer
			// 2nd index: token value
			token = req.headers.authorization.split(" ")[1];
			// verify the payload from given token and put into decoded variable
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

			req.user = await User.findById(decoded.id);
		} catch (error) {
			res.status(404);
			throw new Error("Not Authorized, token failed!");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("No Authentication, no token found");
	}
	next();
});

export const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not Authorized as an admin!");
	}
};
