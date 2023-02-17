import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

import { Container } from "react-bootstrap";
import "./App.css";
import "./bootstrap.min.css";
import CartScreen from "./screens/CartScreen";

function App() {
	return (
		<Fragment>
			<Header />
			<Container>
				<main className="py-3">
					<Container>
						<Routes>
							<Route path="/" element={<HomeScreen />} exact />
							<Route path="/products/:id" element={<ProductScreen />} />
							<Route path="/cart/:id?" element={<CartScreen />} />
						</Routes>
					</Container>
				</main>
			</Container>
			<Footer />
		</Fragment>
	);
}

export default App;
