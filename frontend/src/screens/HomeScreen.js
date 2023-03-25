import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../store/actions/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

function HomeScreen() {
	const params = useParams();

	const keyword = params.keyword;
	const pageNumber = params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta />
			{!keyword && <ProductCarousel />}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
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
					<Paginate
						page={page}
						pages={pages}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	);
}

export default HomeScreen;
