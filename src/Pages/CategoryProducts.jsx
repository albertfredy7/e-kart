import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MyCartContext } from '../ContextApi/ContextShare';

function CategoryProducts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');
    console.log(categoryId);

    const [products, setProducts] = useState([]);
    const {cart, setCart} = useContext(MyCartContext);
    const addToCart = (product) => {
        // Assuming the cart is an array of products
        setCart([...cart, product]);
        alert('Product added to cart');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (categoryId) {
            fetchProducts();
        }
    }, [categoryId]);

    return (
        <Container className='pt-5'>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={4} xl={3} className='p-4 '>
                        <Card style={{ height: '500px' }} className='d-flex flex-col justify-content-between' >
                            {product.images && product.images.length > 0 ? (
                                <Carousel >
                                    {product.images.map((image, index) => (
                                        <Carousel.Item key={index} className='p-3'>
                                            <img
                                                className="d-block w-100 rounded"
                                                src={image}
                                                alt={`Product ${product.id} slide ${index}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <Card.Img variant="top" src={product.image} />
                            )}
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    <div>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            {product.description.split(' ').slice(0, 8).join(' ')}
                                        </Card.Text>
                                    </div>
                                </Link>
                                <div className='d-flex justify-content-between'>
                                    <h4 className='fs-3'>${product.price}</h4>
                                    <Button
                                        variant="dark"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CategoryProducts;