import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';

type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};

//trạng thái giỏ hàng
type CartState = {
  items: CartItem[];
};

// Các hành động có thể thực hiện với giỏ hàng
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: number };

const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);
const SidebarVisibilityContext = createContext(false);
// Hàm reducer xử lý các hành động
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Xử lý thêm sản phẩm vào giỏ hàng
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_FROM_CART':
      // Xử lý xóa sản phẩm khỏi giỏ hàng
      const itemIndexToRemove = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndexToRemove !== -1) {
        const updatedItems = [
          ...state.items.slice(0, itemIndexToRemove),
          ...state.items.slice(itemIndexToRemove + 1),
        ];

        return { ...state, items: updatedItems };
      }

      return state;
    // return { ...state, items: items };
    default:
      return state;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
