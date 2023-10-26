import * as React from 'react';
import AdminSidebar from '../../../components/admin-sidebar/AdminSidebar';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ProductCard } from '../../../components/product-card/ProductCard';
import { deleteItem, getItems } from '../../../data/api';
import { Button, Stack } from '@mui/material';
import { useManageProduct } from '../../../context/ProductContext';

export default function AdminManageProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  type StoreItemProps = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: object;
  };
  const { state } = useManageProduct();
  // console.log(state);
  return (
    <div className="flex">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex flex-col">
          <div className="flex h-screen ">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
        </div>
      </div>
      <div className="py-10 px-20">
        <ul>
          {state.items.map((item) => (
            <li key={item.id} className={`my-5 py-2 h-20 border-2`}>
              <ProductCard {...item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
