import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	useParams,
	useSearchParams,
	useLocation,
} from "react-router-dom";
import Message from "../components/Message";
import {
	Col,
	Row,
	ListGroup,
	Card,
	Image,
	Form,
	Button,
} from "react-bootstrap";

import { addToCart } from "../store/actions/cartAction";

const CartScreen = (props) => {
	const dispatch = useDispatch();
	const params = useParams();
	const productId = params.id;

	const location = useLocation();
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	return <div>CartScreen</div>;
};

export default CartScreen;
