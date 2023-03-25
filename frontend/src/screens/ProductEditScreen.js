import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { PRODUCT_UPDATE_RESET } from "../store/constants/productConstant";
import {
	listProductDetails,
	updateProduct,
} from "../store/actions/productAction";

const ProductEditScreen = () => {
	const params = useParams();
	const productId = params.id;

	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState("");
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			navigate("/admin/productlist");
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
			} else {
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setDescription(product.description);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
			}
		}
	}, [dispatch, productId, product, successUpdate, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		);
	};

	const uploadFileHanlder = async (e) => {
		const file = e.target.files[0];

		const formData = new FormData();

		formData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const { data } = await axios.post("/upload", formData, config);
			console.log("image url", data);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};
	return (
		<>
			<Link to="/admin/productlist">Go Back</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={name}
								placeholder="Enter the product name"
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="price" className="mb-3">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								placeholder="Enter the price"
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="image" className="mb-3">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								value={image}
								placeholder="URL"
								onChange={(e) => setImage(e.target.value)}
							/>
							<Form.Control
								type="file"
								label="Choose File"
								custom="true"
								onChange={uploadFileHanlder}
							/>
							{uploading && <Loader />}
						</Form.Group>
						<Form.Group controlId="description" className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								placeholder="Enter the description"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="brand" className="mb-3">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								value={brand}
								placeholder="Enter the brand"
								onChange={(e) => setBrand(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="category" className="mb-3">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								value={category}
								placeholder="Enter the category"
								onChange={(e) => setCategory(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="countInStock" className="mb-3">
							<Form.Label>Stock</Form.Label>
							<Form.Control
								type="number"
								value={countInStock}
								placeholder="Enter the Stock"
								onChange={(e) => setCountInStock(e.target.value)}
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

export default ProductEditScreen;
