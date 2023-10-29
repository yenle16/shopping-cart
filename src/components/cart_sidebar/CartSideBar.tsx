import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartSidebar.module.css';

function CartSidebar() {
  const { state } = useCart();

  return (
    <div className={`px-20 py-5 shadow-md ${styles['sidebar']}`}>
      <h2 className="text-right pb-5">Giỏ hàng</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id} className={`py-2 ${styles['item']}`}>
            <div className="flex justify-between items-start">
              <div className="flex ">
                <img src={item.image} className={`${styles['img-item']}`} />
                <span className={`text-m px-5 ${styles['title']}`}>{item.title}</span>
              </div>
              <h2 className="font-bold text-red-600 ">{item.price}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartSidebar;
