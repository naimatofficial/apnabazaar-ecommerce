import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../store/actions/productAction";
// import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={"danger"}>{error}</Message>
			) : (
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
			)}
		</>
	);
}

export default HomeScreen;
