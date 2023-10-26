import { Button, Stack } from '@mui/material';
import styles from './ProductCard.module.css';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useManageProduct } from '../../context/ProductContext';
type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};
export function ProductCard(item: ProductCardProps) {
  const { dispatch } = useManageProduct();
  const handleRemoveProduct = (item: ProductCardProps) => {
    // Dispatch hành động để thêm sản phẩm vào giỏ hàng
    console.log('remove', item);
    dispatch({ type: 'REMOVE_PRODUCT', payload: item.id });
  };
  return (
    <div className=" flex  justify-between px-5">
      <div className="flex items-center ">
        <img src={item.image} className="h-14 mx-5 w-14" />
        <div className="flex flex-col items-start">
          <span className={`text-m`}>{item.title}</span>
          <h2 className="font-bold text-red-600 ">{item.price}$</h2>
        </div>
      </div>
      <Stack spacing={2} direction="row" className="justify-around pr-4">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleRemoveProduct(item)}
        >
          Delete
        </Button>
        <Button variant="outlined" startIcon={<EditIcon />}>
          Edit
        </Button>
      </Stack>

      {/*  <div className="flex ">
                  <img src={item.image} className={` `} />
                  <span className={`text-m px-5 `}>{item.title}</span>
                 </div> */}
    </div>
  );
}
