import express from "express";

import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/", getProducts);
// router.get("/:id", getProductById);

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
