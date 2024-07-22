import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box } from '@mui/material';
import { toast } from 'react-toastify';
import './styles.css'; // Asegúrate de que el archivo de estilos esté importado

const Form = ({ addProduct, editProduct, selectedProduct }) => {
  const [product, setProduct] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    stock: '',
    expiryDate: '',
    image: null
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      setEditing(true);
    } else {
      setProduct({
        code: '',
        name: '',
        description: '',
        category: '',
        stock: '',
        expiryDate: '',
        image: null
      });
      setEditing(false);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'expiryDate') {
      // Verifica si la fecha de vencimiento es válida
      const today = new Date().toISOString().split('T')[0];
      if (value < today) {
        toast.error('La fecha de vencimiento no puede ser anterior a la fecha actual');
        return;
      }
    }
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(product).some(field => field === '' || field === null)) {
      toast.error('Por favor, completa todos los campos');
      return;
    }
    if (editing) {
      editProduct(product);
    } else {
      addProduct(product);
    }
    setProduct({
      code: '',
      name: '',
      description: '',
      category: '',
      stock: '',
      expiryDate: '',
      image: null
    });
    setEditing(false);
  };

  const isFormValid = Object.values(product).every(field => field !== '' && field !== null);

  return (
    <Box component="form" onSubmit={handleSubmit} className="form-container">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TextField 
            label="Codigo del Producto" 
            name="code" 
            value={product.code} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
            disabled={editing} // Deshabilita el campo si está en modo de edición
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Nombre del Producto" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Descripción" 
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Categoría"
            name="category"
            value={product.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            {['Alimentos', 'Bebidas', 'Limpieza', 'Higiene', 'Niños', 'Mascota', 'Bazar', 'Electronica'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Stock" 
            name="stock" 
            type="number" 
            value={product.stock} 
            onChange={handleChange} 
            fullWidth 
            variant="outlined" 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Fecha de Vencimiento" 
            name="expiryDate" 
            type="date" 
            value={product.expiryDate} 
            onChange={handleChange} 
            InputLabelProps={{ shrink: true }} 
            fullWidth 
            variant="outlined" 
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <input 
                type="file" 
                accept="image/*" 
                id="upload-button" 
                style={{ display: 'none' }} 
                onChange={handleImageChange}
              />
              <label htmlFor="upload-button">
                <Button 
                  variant="contained" 
                  component="span"
                  className="MuiButton-containedPrimary"
                >
                  Subir Imagen
                </Button>
              </label>
            </Grid>
            <Grid item>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className={`MuiButton-containedPrimary ${!isFormValid ? 'MuiButton-disabled' : ''}`}
                disabled={!isFormValid} // Deshabilita el botón si el formulario no es válido
              >
                {editing ? 'Editar Producto' : 'Agregar Producto'}
              </Button>
            </Grid>
          </Grid>
          {product.image && (
            <Box mt={2}>
              <img src={product.image} alt="Preview" width="100" />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
