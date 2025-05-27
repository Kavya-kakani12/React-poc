// import React, { useState, useEffect, useContext } from 'react';
// import Productcard from './productcard';
// import Editproduct from './editproduct';
// import Modal from './modal';
// import { CartContext } from '../context/CartContext'; 
// import '../css/productlist.css';

// import SignoutButton from './signout';

// // ✅ Import CartContext

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   const { addToCart } = useContext(CartContext); // ✅ Access addToCart from context

//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(response => response.json())
//       .then(data => {
//         if (Array.isArray(data.products)) {
//           setProducts(data.products.slice(0, 1000));
//         } else {
//           console.error('Fetched data is not an array:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleAddProduct = () => {
//     const newId = products.length ? products[products.length - 1].id + 1 : 1;
//     const productToAdd = { ...newProduct, id: newId };
//     setProducts([...products, productToAdd]);
//     setNewProduct({ name: '', description: '', price: '' });
//     setIsAddModalOpen(false);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter(product => product.id !== id));
//   };

//   const handleUpdateProduct = () => {
//     const updatedProducts = products.map(product =>
//       product.id === editingProduct.id ? editingProduct : product
//     );
//     setProducts(updatedProducts);
//     setEditingProduct(null);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingProduct({ ...editingProduct, [name]: value });
//   };

//   const handleEditClick = (product, event) => {
//     setEditingProduct(product);
//   };

//   return (
//     <div className="container">
//       <h1>Product List</h1>
//       <button className="open-add-modal" onClick={() => setIsAddModalOpen(true)}>
//         Add New Product
//       </button>

//       <ul>
//         {products.map(product => (
//           <Productcard
//             key={product.id}
//             product={product}
//             onDelete={handleDeleteProduct}
//             onEdit={(e) => handleEditClick(product, e)}
//             addToCart={() => addToCart(product)} // ✅ Corrected
//           />
//         ))}
//       </ul>

//       {/* Edit Product Modal */}
//       <Modal
//         isOpen={!!editingProduct}
//         onClose={() => setEditingProduct(null)}
//         position="inline"
//       >
//         {editingProduct && (
//           <Editproduct
//             product={editingProduct}
//             onChange={handleEditChange}
//             onUpdate={handleUpdateProduct}
//           />
//         )}
//       </Modal>

//       {/* Add Product Modal */}
//       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} position="inline">
//         <div className="add-product-form">
//           <h2>Add New Product</h2>
//           <input
//             type="text"
//             placeholder="Name"
//             value={newProduct.name}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//           />
//           <button className="add-product" onClick={handleAddProduct}>Add Product</button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useContext } from 'react';
import ProductCard from './productcard';
import EditProduct from './editproduct';
import Modal from './modal';
import { CartContext } from '../context/CartContext';
import '../css/productlist.css';
 
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../hooks/useproduct';
 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const ProductList = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 
  const { addToCart } = useContext(CartContext);
 
  const { data: products = [], isLoading, isError } = useProducts();
  const { mutate: addProduct } = useAddProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
 
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast.error('Please fill in all fields');
      return;
    }
 
    addProduct(
      { ...newProduct, price: parseFloat(newProduct.price) },
      {
        onSuccess: () => toast.success('Product added successfully!'),
        onError: () => toast.error('Failed to add product'),
      }
    );
 
    setNewProduct({ name: '', description: '', price: '', image: '' });
    setIsAddModalOpen(false);
  };
 
  const handleDeleteProduct = (id) => {
    deleteProduct(id, {
      onSuccess: () => toast.success('Product deleted successfully!'),
      onError: () => toast.error('Failed to delete product'),
    });
  };
 
  const handleUpdateProduct = () => {
    updateProduct(editingProduct, {
      onSuccess: () => toast.success('Product updated successfully!'),
      onError: () => toast.error('Failed to update product'),
    });
    setEditingProduct(null);
  };
 
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };
 
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };
 
  return (
    <div className="container">
      <h1>Product List</h1>
      <button className="open-add-modal" onClick={() => setIsAddModalOpen(true)}>
        Add New Product
      </button>
      <button onClick={() => {
        localStorage.removeItem('products');
        window.location.reload();
      }}>
        Reset Product List
      </button>
 
      {isLoading ? (
        <p>Loading products...</p>
      ) : isError ? (
        <p>Failed to load products.</p>
      ) : (
        <ul className="product-list">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onEdit={handleEditClick}
            />
          ))}
        </ul>
      )}
 
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onChange={handleEditChange}
            onUpdate={handleUpdateProduct}
          />
        )}
      </Modal>
 
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button className="add-product" onClick={handleAddProduct}>Add Product</button>
        </div>
      </Modal>
 
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
 
export default ProductList;
