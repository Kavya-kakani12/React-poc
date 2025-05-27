// import React from 'react';

// const editproduct = ({ product, onChange, onUpdate }) => {
//   return (
//     <div className="edit-product">
//       <h2>Edit Product</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={product.name}
//         onChange={onChange}
//       />
//       <input
//         type="text"
//         name="description"
//         placeholder="Description"
//         value={product.description}
//         onChange={onChange}
//       />
//       <input
//         type="number"
//         name="price"
//         placeholder="Price"
//         value={product.price}
//         onChange={onChange}
//       />
//       <button onClick={onUpdate}>Update Product</button>
//     </div>
//   );
// };

// export default editproduct;


import React from 'react';
 
const EditProduct = ({ product, onChange, onUpdate }) => {
  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={onChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={onChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={onChange}
      />
      <button className="update-product" onClick={onUpdate}>Update Product</button>
    </div>
  );
};
 
export default EditProduct;
 
 
 
 
