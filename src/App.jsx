import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ProductTable from './components/Table';
import { Container, Grid, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const addProduct = (product) => {
    const existingProduct = products.find(p => p.code === product.code);
    if (existingProduct) {
      toast.error('El código del producto ya existe');
      return;
    }
    const newProduct = { ...product, id: Date.now().toString() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    toast.success('Producto agregado exitosamente');
  };

  const editProduct = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setSelectedProduct(null);
    toast.success('Producto editado exitosamente');
  };

  const deleteProduct = (id) => {
    confirmAlert({
      title: 'Confirmación de Eliminación',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            setSelectedProduct(null); 
            toast.error('Producto eliminado exitosamente');
          }
        },
        {
          label: 'No'
        }
      ],
      closeOnClickOutside: true, 
    });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{marginLeft:'380px'}}>Stock de Supermercado</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Form addProduct={addProduct} editProduct={editProduct} selectedProduct={selectedProduct} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductTable
            products={products}
            editProduct={handleEditClick}
            deleteProduct={deleteProduct}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default App;
