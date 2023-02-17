import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Image } from "react-bootstrap";

import Logo from "../naimatshop-logo.png";

const Header = () => {
	return (
		<header>
			<Navbar bg="dark" variant="dark" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand className="d-flex align-items-center">
							<Image src={Logo} style={{ width: "50px" }} fluid />
							<span>NaimatShop</span>
						</Navbar.Brand>
					</LinkContainer>
					<Nav className="ml-auto">
						<LinkContainer to="/cart">
							<Nav.Link>
								<i className="fas fa-shopping-cart"></i> Cart
							</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/login">
							<Nav.Link>
								<i className="fas fa-shopping-cart"></i> Sign In
							</Nav.Link>
						</LinkContainer>
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
