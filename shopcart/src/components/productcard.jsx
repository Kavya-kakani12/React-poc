import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
 
const ProductCard = ({
  product,
  onDelete,
  onEdit,
  isEditing,
  onChange,
  onUpdate,
  onCancelEdit
}) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
 
  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };
 
  const imageUrl = product.image || product.images?.[0] || 'https://via.placeholder.com/180';
 
  return (
    <li className="product-card">
      {isEditing ? (
        <div className="edit-overlay">
          <h3>Edit Product</h3>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
          />
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
          />
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={onChange}
          />
          <div className="inline-edit-buttons">
            <button onClick={onUpdate}>Update</button>
            <button onClick={onCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img
            src={imageUrl}
            alt={`Image of ${product.name}`}
            width="180"
            height="180"
          />
          <button onClick={() => onDelete(product.id)}>Delete</button>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      )}
    </li>
  );
};
 
export default ProductCard;