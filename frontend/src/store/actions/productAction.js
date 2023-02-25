import axios from "axios";
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from "../constants/productConstant";

// redux thunk allow to function within the another function
export const listProducts = () => async (dispatch) => {
	try {
		// api request
		dispatch({ type: PRODUCT_LIST_REQUEST });

		// fetch the data from this api
		const { data } = await axios.get("/products");

		// and finaly dispatch the funciton with payload (products list)
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const detailProduct = (productId) => async (dispatch) => {
	try {
		// api request
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		// fetch the data from this api
		const { data } = await axios.get(`/products/${productId}`);

		// and finaly dispatch the funciton with payload (products list)
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
