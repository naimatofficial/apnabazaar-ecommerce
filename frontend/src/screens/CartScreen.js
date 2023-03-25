import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import Message from "../components/Message";
import { Col, Row, ListGroup, Image, Form, Button } from "react-bootstrap";

import { addToCart, removeFromCart } from "../store/actions/cartAction";

const CartScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const productId = params.id;

	const location = useLocation();
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	console.log(cartItems);

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		navigate("/login?redirect=shipping");
	};
	return (
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to="/">Go Back</Link>
						</Message>
					) : (
						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image
												src={item.image}
												alt="product image"
												fluid
												rounded
											/>
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>${item.price}</Col>
										<Col md={2}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={(e) => {
													dispatch(
														addToCart(item.product, Number(e.target.value))
													);
												}}
											>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={1}>
											<Button
												type="button"
												variant="light"
												onClick={() => removeFromCartHandler(item.product)}
											>
												<i className="fas fa-trash " />
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							Total Amount:{" "}
							<span className="price">
								$
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								disabled={cartItems.length === 0}
								className="btn-block w-100"
								onClick={checkoutHandler}
							>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default CartScreen;
