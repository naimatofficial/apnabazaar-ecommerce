import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstant";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/cart/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			price: data.price,
			image: data.image,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};
