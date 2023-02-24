import jwt from "jsonwebtoken";

const generateTokens = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default generateTokens