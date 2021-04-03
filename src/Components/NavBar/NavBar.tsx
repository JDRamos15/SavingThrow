import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

export default function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/"><h1>Saving Throw</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/create-user">Create account</Nav.Link>
                    <Nav.Link href="/signin">Sign in</Nav.Link>
                    {/* <Nav.Link href={"/profile"}>Profile</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
