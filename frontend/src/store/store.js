import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	productReviewCreateReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducer";
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./reducers/userReducer";
import {
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListMyReducer,
	orderListReducer,
	orderPayReducer,
} from "./reducers/orderReducer";

// combine reducers from state
const reducer = combineReducers({
	productDetails: productDetailsReducer,
	productList: productListReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productReviewCreate: productReviewCreateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderDeliver: orderDeliverReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
});

// get the data from local storage
const getCartItemsFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const getUserInfoFromLocalStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const getShippingAddressFromLocalStorage = localStorage.getItem(
	"shippingAddress"
)
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const getPaymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};
// set the initial states
const initialState = {
	cart: {
		cartItems: getCartItemsFromLocalStorage,
		shippingAddress: getShippingAddressFromLocalStorage,
		paymentMethod: getPaymentMethodFromLocalStorage,
	},
	userLogin: { userInfo: getUserInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
