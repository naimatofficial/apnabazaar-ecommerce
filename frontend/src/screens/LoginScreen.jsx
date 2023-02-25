import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../store/actions/userActions";

const FormScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const redirect = location.search ? location.search.split("=")[1] : `/`;

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<FormContainer>
				<h1>Sign In</h1>
				<Form onSubmit={submitHandler}>
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
					<Button type="submit" variant="primary">
						Sign In
					</Button>
				</Form>

				<Row className="py-3">
					<Col>
						New Customer?{" "}
						<Link
							to={redirect ? `/redirect?register=${redirect}` : `/register`}
						>
							Register
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</>
	);
};

export default FormScreen;
