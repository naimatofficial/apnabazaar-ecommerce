/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../store/actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";

function ProductScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [qty, setQty] = useState(1);
	const { id } = useParams();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	useEffect(() => {
		dispatch(detailProduct(id));
	}, [dispatch, id]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};
	return (
		<>
			<Link to="/" className="btn btn-light my-3">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={"danger"}>{error}</Message>
			) : (
				<Row>
					<Col md={4}>
						{/* fluid: fit the container */}
						<Image src={product.image} fluid />
					</Col>
					<Col md={5}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>{product.name}</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											{/* strong is not work, in that case I used custom class*/}
											<p className="price">${product.price}</p>
										</Col>
									</Row>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? "In Stock" : "Out Stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row className="d-flex align-items-center">
											<Col>Qty:</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => {
														setQty(e.target.value);
													}}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className="btn-block w-100"
										type="button"
										disabled={product.countInStock === 0}
									>
										Add To Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
}

export default ProductScreen;
