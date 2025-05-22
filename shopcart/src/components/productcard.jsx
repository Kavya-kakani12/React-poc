import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <li className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.images?.length > 0 && (
        <img src={product.images[0]} alt={product.title} width="180" height="180" />
      )}
      <button onClick={() => onDelete(product.id)}>Delete</button>
      <button onClick={(e) => onEdit(product, e)}>Edit</button>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </li>
  );
};

export default ProductCard;
