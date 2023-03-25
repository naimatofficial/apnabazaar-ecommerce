import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
	getUserDetails,
	updateUserProfile,
} from "../store/actions/userActions";
import { listMyOrders } from "../store/actions/orderAction";
import { USER_UPDATE_RESET } from "../store/constants/userConstants";

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const userDetails = useSelector((state) => state.userDetails);
	const { user, loading, error } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: orderLoading, error: orderError, orders } = orderListMy;

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		} else {
			if (!user || !user.name || success) {
				dispatch({ type: USER_UPDATE_RESET });
				dispatch(getUserDetails("profile"));
				dispatch(listMyOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, user, userInfo, navigate, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		navigate("/");
		if (password !== confirmPassword) {
			setMessage("Password do not match!");
		} else {
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			);
		}
	};
	return (
		<Row>
			<Col md={3}>
				{loading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{success && <Message variant="success">Profile Updated</Message>}
				{message && <Message variant="danger">{message}</Message>}
				<h1>User Details</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name" className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="name"
							value={name}
							placeholder="Enter the username"
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="email" className="mb-3">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							value={email}
							placeholder="Enter the email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="password" className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Enter the password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="confirmPassword" className="mb-3">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmPassword}
							placeholder="Enter the password again"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h1>My Orders</h1>
				{orderLoading ? (
					<Loader />
				) : orderError ? (
					<Message variant="danger">{orderError}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr style={{ backgroundColor: "#444", color: "#fff" }}>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th> -- </th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.deliveredAt ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant="light">Details</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
