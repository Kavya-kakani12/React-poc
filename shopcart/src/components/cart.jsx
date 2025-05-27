// import { useContext } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { CartContext } from "../context/CartContext";
// import '../css/cart.css';

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//     clearCart,
//     getTotalPrice
//   } = useContext(CartContext);

//   const navigate = useNavigate(); 
//   const totalPrice = getTotalPrice().toFixed(2);

//   return (
//     <div>
//       <h2>Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 <img src={item.thumbnail || item.image} alt={item.title} width="200" height="200" />
//                 <span>{item.title} - ${item.price} x {item.quantity}</span>
//                 <div>
//                   <button onClick={() => decreaseQuantity(item.id)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => increaseQuantity(item.id)}>+</button>
//                 </div>
//                 <button onClick={() => removeFromCart(item.id)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//           <h3>Total Price: ${totalPrice}</h3>
//           <button onClick={clearCart}>Clear Cart</button>
//           <button onClick={() => navigate('/checkout')}>Checkout</button> {/* <-- Checkout Button */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import '../css/cart.css';
 
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice
  } = useContext(CartContext);
 
  const navigate = useNavigate();
  const totalPrice = getTotalPrice().toFixed(2);
 
  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      clearCart();
      navigate('/');
    }
  };
 
  return (
    <div className="cart-page">
      <div className="cart-wrapper">
        <div className="cart-signout-container">
          <button className="cart-signout-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
 
        <h2 className="cart-title">Shopping Cart</h2>
 
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="cart-items-list">
              {cartItems.map((item) => (
                <li className="cart-item-box" key={item.id}>
                  <img src={item.thumbnail || item.image} alt={item.title} />
                  <div className="cart-item-info">
                    <span>{item.title} - ${item.price} x {item.quantity}</span>
                    <div className="cart-item-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total Price: ${totalPrice}</div>
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Cart;
 

