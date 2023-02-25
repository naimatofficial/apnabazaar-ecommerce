import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTokens from "../utils/generateTokens.js";

// @desc   Auth User
// @route  POST /users/login
// @access Public

export const userAuth = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateTokens(user._id),
		});
	} else {
		res.status(401);
		throw new Error("The email or password are does not match!");
	}
});

// @desc   Register User
// @route  POST /users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExisit = await User.findOne({ email });

	if (userExisit) {
		res.status(400);
		throw new Error("This email aleardy register");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateTokens(user._id),
		});
	} else {
		res.status(404);
		throw new Error("user not found!");
	}
});

// @desc   Get User Profile
// @route  GET /users/profile
// @access Private

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc   Update User Profile
// @route  PUT /users/profile
// @access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}
	} else {
		res.status(404);
		throw new Error("User not found");
	}

	const updatedUser = await user.save();

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: generateTokens(user._id),
	});
});
