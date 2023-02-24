import express from "express";

import {
	getUserProfile,
	registerUser,
	userAuth,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(registerUser);
router.post("/login", userAuth);
router.route("/profile").get(protect, getUserProfile);

export default router;
