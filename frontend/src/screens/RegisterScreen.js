import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../store/actions/userActions";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const redirect = location.search ? location.search.split("=")[1] : `/`;

	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setMessage(null);
			dispatch(register(name, email, password));
		} else {
			setMessage("Password do not match!");
		}
	};
	return (
		<FormContainer>
			<h1>Register New Account</h1>
			{loading && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{message && <Message variant="danger">{message}</Message>}
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
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an Account?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
