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
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
	return (
		<Fragment>
			<Header />
			<Container>
				<main className="py-3">
					<Container>
						<Routes>
							<Route path="/login" element={<LoginScreen />} />
							<Route path="/register" element={<RegisterScreen />} />
							<Route path="/profile" element={<ProfileScreen />} />
							<Route path="/products/:id" element={<ProductScreen />} />
							<Route path="/cart/:id?" element={<CartScreen />} />
							<Route path="/" element={<HomeScreen />} exact />
						</Routes>
					</Container>
				</main>
			</Container>
			<Footer />
		</Fragment>
	);
}

export default App;
