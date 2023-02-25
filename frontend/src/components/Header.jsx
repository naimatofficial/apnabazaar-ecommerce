import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/actions/userActions";

import { Image } from "react-bootstrap";

import Logo from "../naimatshop-logo.png";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

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
						{userInfo ? (
							<NavDropdown title={userInfo.name} id="username">
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i> Sign In
								</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
