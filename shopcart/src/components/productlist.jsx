import React, { useState, useContext } from 'react';
import ProductCard from './productcard';
import EditProduct from './editproduct';
import Modal from './modal';
// import EditModal from './editmodal';
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
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 
const [editModalPosition, setEditModalPosition] = useState(null);
 
 
  const { data: products = [], isLoading, isError } = useProducts();
  const { mutate: addProduct } = useAddProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
 
  const handleAddProduct = (e) => {
    e.preventDefault();
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
 
  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="product-actions">
        <button onClick={() => setIsAddModalOpen(true)}>Add New Product</button>
        <button onClick={() => {
          localStorage.removeItem('products');
          window.location.reload();
        }}>
          Reset Product List
        </button>
      </div>
 
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
              onEdit={setEditingProduct}
            />
          ))}
        </ul>
      )}
 
      {/* Edit Modal */}
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onChange={handleEditChange}
            onUpdate={handleUpdateProduct}
          />
        )}
      </Modal>
 
      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <form className="add-product-form" onSubmit={handleAddProduct}>
          <h2>Add New Product</h2>
          <label>
            Name:
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Add Product</button>
            <button type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
 
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
 
export default ProductList;