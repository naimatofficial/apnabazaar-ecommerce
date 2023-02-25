import express from "express";

import {
	getUserProfile,
	registerUser,
	updateUserProfile,
	userAuth,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", userAuth);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;
