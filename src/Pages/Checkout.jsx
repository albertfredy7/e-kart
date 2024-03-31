import React, { useContext, useState, useEffect } from 'react';
import { MyCartContext } from '../ContextApi/ContextShare';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cart ,setCart} = useContext(MyCartContext);
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newAddress, setNewAddress] = useState({
        line1: 'xyxgn House',
        pincode: '680000',
        landmark: 'Next to xyz mall',
        mobile: '9876543210'
    });

    useEffect(() => {
        setAddresses([newAddress]);
        setNewAddress({ line1: '', pincode: '', landmark: '', mobile: '' });
    }, []);

    const handleAddAddress = () => {
        setAddresses([...addresses, newAddress]);
        setNewAddress({ line1: '', pincode: '', landmark: '', mobile: '' });
        setShowModal(false);
    };

    const handleCheckout = () => {
        alert('Order Placed Successfully');
        setCart([]);
        navigate('/')
        
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='container'>
            <h1 className='pt-5'>Checkout</h1>

            <div className='mt-5'>
                {cart.length === 0 ? <h3>You have Nothing to checkout</h3>
                    :
                    cart.map((product) => (
                        <div className='d-flex flex-column' key={product.id}>
                            <img src={product.images[0]} style={{ width: '10%' }} className='rounded-2' alt="" />
                            <div>
                                <h3>{product.title}</h3>
                                <h5>Price: ${product.price}</h5>
                            </div>
                        </div>
                    ))}
            </div>
            <hr />

            <div className='py-5'>
                <h3>Select Address</h3>
                <div className=' '>
                    <div>
                        {Object.keys(selectedAddress).length === 0 ? (
                            <div className='d-flex flex-wrap gap-5'>
                                {addresses.map((address, index) => (
                                    <Card className="mt-3 w-25" style={{ backgroundColor: '#f0f0f0' }} key={index} onClick={() => setSelectedAddress(address)}>
                                        <Card.Body>
                                            <Card.Title>Address {index + 1}</Card.Title>
                                            <Card.Text>{address.line1}</Card.Text>
                                            <Card.Text>Pincode: {address.pincode}</Card.Text>
                                            <Card.Text>Landmark: {address.landmark}</Card.Text>
                                            <Card.Text>Mobile: {address.mobile}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))}
                                <Button variant="outline-dark" onClick={() => setShowModal(true)} className='mt-3'>Add New Address</Button>
                            </div>
                        ) : (
                            <>
                                <h4>Delivered to</h4>
                                <Card className="mt-3 w-25" style={{ backgroundColor: '#f0f0f0' }}>
                                    <Card.Body>
                                        <Card.Text>{selectedAddress.line1}</Card.Text>
                                        <Card.Text>Pincode: {selectedAddress.pincode}</Card.Text>
                                        <Card.Text>Landmark: {selectedAddress.landmark}</Card.Text>
                                        <Card.Text>Mobile: {selectedAddress.mobile}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <h3>Payment</h3>
                <div>
                    <div className=''>
                        <div className=''>
                            <div className='p-5 d-flex  flex-wrap gap-5 '>
                                <button className='btn btn-outline-dark p-5'>Cash on Delivery</button>
                                <button className='btn btn-outline-dark p-5'>Credit Card</button>
                                <button className='btn btn-outline-dark p-5'>Debit Card</button>
                                <button className='btn btn-outline-dark p-5'>Net Banking</button>
                                <button className='btn btn-outline-dark p-5'>UPI</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="line1">
                            <Form.Label>Address Line 1</Form.Label>
                            <Form.Control type="text" placeholder="Enter address line 1" value={newAddress.line1} onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="pincode">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" placeholder="Enter pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="landmark">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control type="text" placeholder="Enter landmark" value={newAddress.landmark} onChange={e => setNewAddress({ ...newAddress, landmark: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="mobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="text" placeholder="Enter mobile number" value={newAddress.mobile} onChange={e => setNewAddress({ ...newAddress, mobile: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleAddAddress}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {cart.length > 0 && <div className='d-flex justify-content-between m-5 bg-dark p-5 text-white'>
                <h3>Total: ${cart.reduce((acc, product) => acc + product.price, 0)}</h3>
                <button className='btn btn-light' onClick={handleCheckout}>Place Order</button>
            </div>}
        </div>
    );
}

export default Checkout;