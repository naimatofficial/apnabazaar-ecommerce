import express from "express";

import {
	createdProductReview,
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getTopProducts,
	updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/", getProducts);
// router.get("/:id", getProductById);

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);
router.route("/:id/reviews").post(protect, createdProductReview);
router
	.route("/:id")
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
