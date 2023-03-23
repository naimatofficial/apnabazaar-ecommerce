/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
	createProductReview,
	listProductDetails,
} from "../store/actions/productAction";
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
	FormGroup,
} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { PRODUCT_CREATE_REVIEW_RESET } from "../store/constants/productConstant";

function ProductScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const params = useParams();
	const productId = params.id;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { success: successProductReview, error: errorProductReview } =
		productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(productId));
	}, [dispatch, productId, successProductReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${productId}?qty=${qty}`);
	};

	const productReviewHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(productId, { rating, comment }));
		successProductReview && (
			<Alert variant="success">Your review are added successfully!</Alert>
		);
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
				<>
					<Row>
						<Col md={4}>
							{/* fluproductId: fit the container */}
							<Image src={product.image} alt={product.name} fluid />
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
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
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
					<Row>
						<Col md={6} className="mt-5">
							<h2>Product Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => {
									return (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									);
								})}
								<ListGroup.Item>
									<h2>Write a customer review</h2>
									{errorProductReview && (
										<Message variant="danger">{errorProductReview}</Message>
									)}
									{!userInfo ? (
										<Message>
											Please <Link to="/login">sgin in</Link> for writing a
											review
										</Message>
									) : (
										<Form onSubmit={productReviewHandler}>
											<FormGroup controlId="rating" className="mt-2">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
												<FormGroup controlId="comment" className="mt-2">
													<Form.Label>Comment</Form.Label>
													<Form.Control
														as="textarea"
														row="3"
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													/>
												</FormGroup>
												<Button
													type="submit"
													variant="primary"
													className="my-2"
												>
													Submit
												</Button>
											</FormGroup>
										</Form>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
}

export default ProductScreen;
