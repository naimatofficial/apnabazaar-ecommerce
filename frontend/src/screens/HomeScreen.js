import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../store/actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

function HomeScreen() {
	const params = useParams();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	const keyword = params.keyword;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listProducts(keyword));
	}, [dispatch, keyword]);

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
