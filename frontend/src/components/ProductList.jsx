import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const ProductList = ({ products }) => {
	return (
		<Row>
			<h1>Latest Products</h1>
			{products.map((product) => {
				return (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				);
			})}
		</Row>
	);
};

export default ProductList;
