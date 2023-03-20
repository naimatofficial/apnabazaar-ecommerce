import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../store/actions/userActions";
import { USER_UPDATE_RESET } from "../store/constants/userConstants";

const UserEditScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const userId = params.id;

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, user, error } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			navigate("/admin/userlist");
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setIsAdmin(user.isAdmin);
				console.log("setData", user);
			}
		}
	}, [dispatch, userId, user, successUpdate, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				_id: userId,
				name,
				email,
				isAdmin,
			})
		);
	};
	return (
		<>
			<Link to="/admin/userlist">Go Back</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
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
						<Form.Group controlId="isAmdin" className="mb-3">
							<Form.Check
								type="checkbox"
								label="is Admin"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							/>
						</Form.Group>
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
