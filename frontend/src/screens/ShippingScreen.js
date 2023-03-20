import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../store/actions/cartAction";

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [address, setAddress] = useState(shippingAddress.address);
	const [country, setCountry] = useState(shippingAddress.country);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [city, setCity] = useState(shippingAddress.city);

	const submitHandler = (e) => {
		console.log("submit");
		e.preventDefault();
		dispatch(saveShippingAddress({ address, country, postalCode, city }));
		navigate("/payment");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address" className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						required
						type="address"
						value={address}
						placeholder="Enter address"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="postalCode" className="mb-3">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						required
						type="postalCode"
						value={postalCode}
						placeholder="Enter postal code"
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="city" className="mb-3">
					<Form.Label>City</Form.Label>
					<Form.Control
						required
						type="city"
						value={city}
						placeholder="Enter city"
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="country" className="mb-3">
					<Form.Label>Country</Form.Label>
					<Form.Control
						required
						type="country"
						value={country}
						placeholder="Enter country"
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
