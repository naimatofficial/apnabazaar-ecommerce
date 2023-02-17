import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
	return (
		<Card className="rounded my-3 p-3">
			<Link to={`/products/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/products/${product._id}`}>
					<Card.Text as="div">
						<strong>{product.name}</strong>
					</Card.Text>
				</Link>
				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
