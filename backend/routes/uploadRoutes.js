import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Define storage options for multer
const storage = multer.diskStorage({
	// Set the destination for uploaded files
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	// Set the filename for uploaded files
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

// Function to check if the uploaded file is an image
function checkFileType(req, file, cb) {
	const filetypes = /jpg|png|jpeg/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		return cb("Images only");
	}
}

// Create multer instance with storage options and file filter function
const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

// Define route for handling file upload
router.post("/", upload.single("image"), (req, res) => {
	res.json(`/${req.file.path}`);
});

export default router;
