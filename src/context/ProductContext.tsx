import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { getItems } from '../data/api';
import { StoreItemProps } from '../pages/admin/admin-manage-product/AdminManageProduct';

// export type ProductProps = {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: object;
// };

// Product state
type ProductState = {
  items: StoreItemProps[];
};

// Product actions
type ManageProductAction =
  | { type: 'REMOVE_PRODUCT'; payload: number }
  | { type: 'SET_INITIAL_STATE'; payload: StoreItemProps[] }
  | { type: 'UPDATE_PRODUCT'; payload: StoreItemProps };

// Context
const ProductContext = createContext<
  { state: ProductState; dispatch: React.Dispatch<ManageProductAction> } | undefined
>(undefined);
// Reducer
const productReducer = (state: ProductState, action: ManageProductAction): ProductState => {
  switch (action.type) {
    case 'REMOVE_PRODUCT':
      // Remove product from list
      const itemIndexToRemove = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndexToRemove !== -1) {
        const updatedItems = [
          ...state.items.slice(0, itemIndexToRemove),
          ...state.items.slice(itemIndexToRemove + 1),
        ];
        return { ...state, items: updatedItems };
      }
      return state;

    case 'SET_INITIAL_STATE':
      // Set initial state from payload
      return { ...state, items: action.payload };

    case 'UPDATE_PRODUCT':
      // Update product in list
      const itemIndexToUpdate = state.items.findIndex((item) => item.id === action.payload.id);
      if (itemIndexToUpdate !== -1) {
        const updatedItem = { ...state.items[itemIndexToUpdate], ...action.payload };
        const updatedItems = [
          ...state.items.slice(0, itemIndexToUpdate),
          updatedItem,
          ...state.items.slice(itemIndexToUpdate + 1),
        ];
        return { ...state, items: updatedItems };
      }
      return state;
    default:
      return state;
  }
};
// Provider
interface ManageProductProviderProps {
  children: ReactNode;
}

export const ManageProductProvider: React.FC<ManageProductProviderProps> = ({ children }) => {
  const [items, setItems] = useState<StoreItemProps[]>([]);
  const [state, dispatch] = useReducer(productReducer, { items: items });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data as StoreItemProps[]);

        // Set initial state with data from API
        dispatch({ type: 'SET_INITIAL_STATE', payload: data as StoreItemProps[] });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};
// Hook
export const useManageProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a ManageProductProvider');
  }
  return context;
};
