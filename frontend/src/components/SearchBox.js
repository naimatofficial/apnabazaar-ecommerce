import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();

		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};
	return (
		<Form onSubmit={submitHandler} inline="true" className="d-flex d-lg-none">
			<Form.Control
				type="text"
				name="q"
				placeholder="Search Products..."
				onChange={(e) => setKeyword(e.target.value)}
				aria-label="Search"
				className="me-2"
			></Form.Control>
			<Button type="submit" variant="outline-success" className="p-2">
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;
