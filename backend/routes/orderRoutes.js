import express from "express";
import { admin, protect } from "../middlewares/authMiddleware.js";
import {
	addOrderItems,
	getOrders,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
