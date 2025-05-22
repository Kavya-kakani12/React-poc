// Modal.js
import React from 'react';
import '../css/modal.css'; 

const modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default modal;



// modal.js
// const Modal = ({ isOpen, onClose, children, position = "center" }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={`modal-overlay ${position === "inline" ? "inline-modal" : ""}`}>
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>×</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;


