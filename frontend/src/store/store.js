import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
	productDetails: productDetailsReducer,
	productList: productListReducer,
	cart: cartReducer,
});

const getCartItemsFromLocalStorage = localStorage.getItem("cartItem")
	? JSON.parse(localStorage.getItem().cart.cartItems)
	: [];

const initialState = {
	cart: { cartItems: getCartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
