import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MyCartContext } from '../ContextApi/ContextShare';

function Details() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const {cart,setCart} = useContext(MyCartContext)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State for selected image index

    const addToCart = () => {
        // Use productDetails directly since it's already available in the component's state
        console.log(productDetails);
        setCart([...cart, productDetails]);
        alert('Product added to cart');
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
                setProductDetails(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, []);

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className='d-flex flex-column gap-5 container p-5'>
            <div>
                <div className='d-flex flex-row '>

                    {/* Main Image */}
                    {productDetails && productDetails.images.length > 0 && (
                        <img src={productDetails.images[selectedImageIndex]} alt={productDetails.name} style={{ width: '55%', height: 'auto' }} />
                    )}

                    {/* Thumbnails */}
                    <div className='p-5 d-flex flex-column'>
                        {productDetails && productDetails.images.map((image, index) => (
                            <img key={index} src={image} alt={productDetails.name} className='p-2 rounded-4' style={{ width: '100px', height: 'auto', cursor: 'pointer' }} onClick={() => handleThumbnailClick(index)} />
                        ))}
                    </div>

                    <div >
                        {/* Product details section */}
                        {productDetails ? (
                            <div className='d-flex flex-column justify-content-between'>
                                <h1 className='text-box' style={{ fontSize: '40px' }}>{productDetails.title}</h1>
                                <p className='text-left'>{productDetails.description}</p>
                                <div className='d-flex justify-content-between mt-5'>
                                    <h2>$ {productDetails.price}</h2>
                                    <button className='btn btn-dark w-50  ' onClick={addToCart}>Add to cart</button>
                                </div>

                            </div>
                        ) : (
                            <p>Loading product details...</p>
                        )}

                    </div>


                </div>
            </div>

        </div>
    );
}

export default Details;