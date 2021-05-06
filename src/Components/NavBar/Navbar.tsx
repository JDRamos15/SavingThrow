import { Navbar, Nav } from "react-bootstrap";
import { isLogged, getPublicId, getUsername, logout } from "../../Services/authentication";
import React, { useEffect } from 'react';
import savingThrowLogo from '../../Images/SavingThrowLogo.png';
import "./Navbar.css";

export default function NavBar() {

    const [logged, setLogged] = React.useState(isLogged());


    useEffect(() => { refresh() }
    )

    function refresh() {
        if (logged != isLogged()) {
            setLogged(isLogged())
        }
    }


    if (logged) {
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={savingThrowLogo}
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href={"/profile/" + getUsername()}>Profile</Nav.Link>
                        <Nav.Link href={"/joinGame"}>Join Game</Nav.Link>
                        <Nav.Link href="/" onClick={(logout)}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand href="/" className="d-flex align-content-left">
                    <img
                        alt=""
                        src={savingThrowLogo}
                        width="100"
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/create-user">Create account</Nav.Link>
                        <Nav.Link href="/login">Sign in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}