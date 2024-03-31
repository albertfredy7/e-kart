import React, { useContext } from 'react'
import { MyCartContext } from '../ContextApi/ContextShare'
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate();
    const { cart, setCart } = useContext(MyCartContext)
    console.log(cart);

    function removeFromCart(productId) {
        setCart(prevCart => prevCart.filter(product => product.id !== productId));
    }

    const handleCheckout = () => {
        navigate('/checkout')
        
    }

    // Check if the cart is empty
    if (cart.length === 0) {
        return (
            <div className='d-flex flex-column justify-content-between ' style={{ height: '94vh' }}>
                <Container className='pt-5'>
                    <h1>Cart</h1>
                   <div className='d-flex flex-column justify-content-center align-items-center'>
                        <img src="https://truewholesale.in/website-frontend/tws/assets/img/chat.gif" className='w-25' alt="" />
                        <h4>Your cart is empty.</h4>
                   </div>
                </Container>
            </div>
        );
    }
    return (
        <div className='d-flex flex-column justify-content-between ' style={{ height: '94vh' }}>

            <Container className='pt-5'>
                <h1>Cart</h1>
                <Row>

                    <div className='d-flex flex-wrap'>
                        {cart?.map((product) => (
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
                                                    {product.description ?.split(' ').slice(0, 8).join(' ')}
                                                </Card.Text>
                                            </div>
                                        </Link>
                                        <div className='d-flex justify-content-between'>
                                            <h4 className='fs-3'>${product.price}</h4>
                                            <Button
                                                variant="dark"
                                                onClick={() => removeFromCart(product.id)}
                                            >
                                                Remove from cart
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </div>




                </Row>
            </Container>
            <div style={{ backgroundColor: '#f0f0f0' }} >
                <div className='p-5 d-flex justify-content-between container' >
                    <div>
    
                        {
                            cart.map((product,index) => (
                                <div key={product.id}>
                                    <h5>{index+1} -  {product.title} -${ product.price} </h5>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <h2>Total: ${cart.reduce((acc, product) => acc + product.price, 0)}</h2>
                        <Button variant='dark' className='w-100' onClick={handleCheckout}>Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart