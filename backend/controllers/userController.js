import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTokens from "../utils/generateTokens.js";

// @desc   Auth User
// @route  POST /users
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
