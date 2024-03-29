import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
	deleteProduct,
	listProducts,
	createProduct,
} from "../store/actions/productAction";
import { PRODUCT_CREATE_RESET } from "../store/constants/productConstant";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const pageNumber = params.pageNumber || 1;

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate("/login");
		}

		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts("", pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		navigate,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	const deleteHandler = (productId) => {
		if (window.confirm("Are you sure!")) {
			dispatch(deleteProduct(productId));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Create Products
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message Message variant="danger">
					{error}{" "}
				</Message>
			) : (
				<>
					<Table striped responsive border={"2px"} hover className="table-sm">
						<thead>
							<tr>
								<th>NAME</th>
								<th>ID</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th>PRICE</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>
										<Image
											src={product.image}
											alt={product.name}
											style={{
												width: "40px",
												height: "40px",
												objectFit: "contain",
											}}
										/>{" "}
										{product.name}
									</td>
									<td>{product._id}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>{product.price}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button className="btn-sm" variant="light">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(product._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate page={page} pages={pages} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
