import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyCartContext } from '../ContextApi/ContextShare';

function NavigationBar() {

    const [categories, setCategories] = useState([]);
    const {cart} = useContext(MyCartContext)


    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/categories')
            .then(response => {
                // using a Set to ensure each category name is unique . for example : in categoris array there are multiple categories with same name :  meat
                const uniqueCategories = new Set();
                // filtering categories that have already been added to the Set
                const filteredCategories = response.data.filter(category => {
                    if (!uniqueCategories.has(category.name)) {
                        uniqueCategories.add(category.name);
                        return true;
                    }
                    return false;
                });

                setCategories(filteredCategories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">E-kart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categories" id="collapsible-nav-dropdown">
                            {categories.map((category, index) => (
                                <NavDropdown.Item key={index} as={Link} to={`/product/${category.name}?categoryId=${category.id}`}>
                                    {category.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/cart">Cart <Badge bg="secondary">{cart.length}</Badge></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar