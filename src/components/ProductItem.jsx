import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const ProductItem = ({ product, editProduct, deleteProduct }) => {
  // Verificar si el producto está definido
  if (!product) {
    return null; // No renderizar nada si el producto es undefined
  }

  return (
    <TableRow>
      <TableCell>{product.code}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>{product.expiryDate}</TableCell>
      <TableCell><img src={product.image} alt={product.name} width="50" /></TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={() => editProduct(product)}>Editar</Button>
        <Button variant="contained" color="secondary" onClick={() => deleteProduct(product.id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
