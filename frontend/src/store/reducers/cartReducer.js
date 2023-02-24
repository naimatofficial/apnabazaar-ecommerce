import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem =
				Array.isArray(state.cartItems) &&
				state.cartItems.find((p) => p.product === item.product);
			console.log("CART ADD ITEM");
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((cart) =>
						cart.product === existItem.product ? item : cart
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(item) => item.product !== action.payload
				),
			};
		default:
			return state;
	}
};
