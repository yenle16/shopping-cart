import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { getItems } from '../data/api';

type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};

// Trạng thái list sản phẩm
type ProductState = {
  items: ProductProps[];
};

// Các hành động có thể thực hiện với list sản phẩm
type ManageProductAction =
  | { type: 'REMOVE_PRODUCT'; payload: number }
  | { type: 'SET_INITIAL_STATE'; payload: ProductProps[] };

const ProductContext = createContext<
  { state: ProductState; dispatch: React.Dispatch<ManageProductAction> } | undefined
>(undefined);
// Hàm reducer xử lý các hành động
const productReducer = (state: ProductState, action: ManageProductAction): ProductState => {
  switch (action.type) {
    case 'REMOVE_PRODUCT':
      // Xử lý xóa sản phẩm khỏi list sản phẩm
      const itemIndexToRemove = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndexToRemove !== -1) {
        const updatedItems = [
          ...state.items.slice(0, itemIndexToRemove),
          ...state.items.slice(itemIndexToRemove + 1),
        ];
        return { ...state, items: updatedItems };
      }
      return state; // Đảm bảo luôn return state ở đây

    case 'SET_INITIAL_STATE':
      // Xử lý cài đặt trạng thái ban đầu từ payload
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

interface ManageProductProviderProps {
  children: ReactNode;
}

export const ManageProductProvider: React.FC<ManageProductProviderProps> = ({ children }) => {
  const [items, setItems] = useState<ProductProps[]>([]);
  const [state, dispatch] = useReducer(productReducer, { items: items });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data as ProductProps[]);

        // Sau khi lấy dữ liệu, cài đặt trạng thái ban đầu bằng dữ liệu từ API
        dispatch({ type: 'SET_INITIAL_STATE', payload: data as ProductProps[] });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export const useManageProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a ManageProductProvider');
  }
  return context;
};
