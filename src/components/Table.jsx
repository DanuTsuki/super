import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ProductItem from './ProductItem';

const ProductTable = ({ products, editProduct, deleteProduct }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Fecha de Vencimiento</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
