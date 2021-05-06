import { Navbar, Nav } from "react-bootstrap";
import {isLogged,getPublicId, getUsername, logout} from "../../Services/authentication";
import React, {useEffect} from 'react';
import "./Navbar.css";

export default function NavBar() {

    const [logged, setLogged] = React.useState(isLogged());


    useEffect (() => 
    {refresh()}
    )
    
    function refresh(){
        console.log("here")
        if(logged != isLogged()){
            setLogged(isLogged())
        }
    }
   

    if(logged){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/"><h1>Saving Throw</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href={"/profile/"+getUsername()}>Profile</Nav.Link>
                    <Nav.Link href={"/joinGame"}>Join Game</Nav.Link>
                    <Nav.Link href="/" onClick = {(logout)}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            );
    }
    else{
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/"><h1>Saving Throw</h1></Navbar.Brand>
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