import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../css/checkout.css';
 
const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.email) {
      alert('Please fill in all fields');
      return;
    }
 
    setIsSubmitting(true);
 
    console.log('Order Details:', {
      customer: formData,
      items: cartItems,
      total: getTotalPrice().toFixed(2)
    });
 
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      setIsSubmitting(false);
    }, 1000);
  };
 
  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }
 
  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h2 className="checkout-title">Checkout</h2>
 
        <ul className="checkout-items-list">
          {cartItems.map(item => (
            <li key={item.id} className="checkout-item">
              <img src={item.thumbnail || item.image} alt={item.title} />
              <div className="checkout-item-details">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
 
        <div className="checkout-summary">
          Total: ${getTotalPrice().toFixed(2)}
        </div>
 
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default Checkout;
 
 
 
 
 
 
 
