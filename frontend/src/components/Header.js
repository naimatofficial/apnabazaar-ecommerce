import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../store/actions/userActions";
const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="sticky-nav">
			<Navbar
				bg="dark"
				variant="dark"
				collapseOnSelect
				className="navbar navbar-expand-lg navbar-dark bg-primary"
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<span className="md:fs-1">Apna Bazaar</span>
						</Navbar.Brand>
					</LinkContainer>
					<SearchBox />
					<Nav className="ml-auto ">
						{userInfo ? (
							userInfo.isAdmin ? (
								""
							) : (
								<LinkContainer to="/cart">
									<Nav.Link>
										<i className="fas fa-shopping-cart"></i> Cart
									</Nav.Link>
								</LinkContainer>
							)
						) : (
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i>
									Cart
								</Nav.Link>
							</LinkContainer>
						)}

						{userInfo ? (
							<NavDropdown title={userInfo.name} id="username">
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/">
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i> Sign In
								</Nav.Link>
							</LinkContainer>
						)}
						{userInfo && userInfo.isAdmin && (
							<NavDropdown title="Admin" id="adminlist">
								<LinkContainer to="/admin/userlist">
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/admin/productlist">
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/admin/orderlist">
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
