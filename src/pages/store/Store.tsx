import { useEffect, useState } from 'react';
import { StoreItem } from '../../components/store_item/StoreItem';
import { getItems } from '../../data/api';
import styles from './Store.module.css';
export function Store() {
  type StoreItemProps = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: object;
  };
  const [items, setItems] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data as StoreItemProps[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`mt-20 ${styles['store']}`}>
      <div className="mx-20">
        <h1>Store</h1>
        <div className="flex flex-wrap">
          {items.map((item) => (
            <div key={item.id} className="py-10 px-2">
              <StoreItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
