import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../css/checkout.css'; // Optional: create this for styling

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

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

    console.log('Order Details:', {
      customer: formData,
      items: cartItems,
      total: getTotalPrice().toFixed(2)
    });

    setOrderPlaced(true);
    clearCart();
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
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {/* <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul> */}
        <ul className="checkout-items-list">
  {cartItems.map(item => (
    <li key={item.id} className="checkout-item">
      {/* <img src={item.image} alt={item.title} className="checkout-item-image" /> */}
      <img src={item.thumbnail || item.image} alt={item.title} width="200" height="200" />
      <div className="checkout-item-details">
        <span>{item.title} x {item.quantity}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </li>
  ))}
</ul>

        <h4>Total: ${getTotalPrice().toFixed(2)}</h4>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h3>Shipping Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
