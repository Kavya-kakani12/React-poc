import React from 'react';
import '../css/modal.css';
 
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
 
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};
 
export default Modal;

// import React from 'react';
// import '../css/modal.css';
 
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;
 
//   return (
//     <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>&times;</button>
//         {children}
//       </div>
//     </div>
//   );
// };
 
// export default Modal;