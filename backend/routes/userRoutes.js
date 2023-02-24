import express from "express";

import { userAuth } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", userAuth);

export default router;
