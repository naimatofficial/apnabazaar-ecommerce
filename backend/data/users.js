import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin",
		email: "admin@example.com",
		password: bcrypt.hashSync("123456", 10),
		isAdmin: true,
	},
	{
		name: "Naimat",
		email: "naimat@example.com",
		password: bcrypt.hashSync("123456", 10),
	},
	{
		name: "Ali",
		email: "ali@example.com",
		password: bcrypt.hashSync("123456", 10),
	},
];

export default users;
