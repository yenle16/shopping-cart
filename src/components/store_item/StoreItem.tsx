import { useCart } from '../../context/CartContext';
import styles from './StoreItem.module.css';
import React, { useState } from 'react';
type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};
export function StoreItem(item: StoreItemProps) {
  // const quantity: number = 1;
  const [quantity, setQuantity] = useState(0);
  const handleIncreaseQuantity = (quantity: number) => {
    handleAddToCart(item);
    setQuantity(quantity + 1);
  };
  const handleDecreaseQuantity = (quantity: number) => {
    handleRemoveFromCart(item);
    setQuantity(quantity - 1);
  };
  const { dispatch } = useCart();
  const handleAddToCart = (item: StoreItemProps) => {
    // Dispatch hành động để thêm sản phẩm vào giỏ hàng
    console.log('add', item);
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };
  const handleRemoveFromCart = (item: StoreItemProps) => {
    // Dispatch hành động để thêm sản phẩm vào giỏ hàng
    console.log('remove', item);
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
  };
  return (
    <div className={`flex flex-col items-center justify-center border-2 ${styles['card-item']}`}>
      <div className={`flex flex-col items-center justify-between pb-5 ${styles['item-info']}`}>
        <div className="flex flex-col items-center ">
          <div className={`pb-2  ${styles['item-image']}`}>
            <img src={item.image} alt="a" />
          </div>
          <h2 className="text-xl font-bold pb-2 ">{item.title}</h2>
        </div>
        <h2>{item.price} $</h2>
      </div>
      <div>
        {quantity === 0 ? (
          <button
            className="px-5 py-2 mt-2 bg-blue-200 font-semibold rounded-sm"
            onClick={() => handleIncreaseQuantity(quantity)}
          >
            Add to cart
          </button>
        ) : (
          <div>
            <button
              className="px-3 mx-2 py-2 mt-2 bg-blue-200 font-semibold rounded-sm"
              onClick={() => handleDecreaseQuantity(quantity)}
            >
              -
            </button>
            {quantity} in cart
            <button
              className="mx-2 px-3 py-2 mt-2 bg-blue-200 font-semibold rounded-sm"
              onClick={() => handleIncreaseQuantity(quantity)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
