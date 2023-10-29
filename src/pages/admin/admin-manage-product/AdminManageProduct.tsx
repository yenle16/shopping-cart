import * as React from 'react';
import AdminSidebar from '../../../components/admin_sidebar/AdminSidebar';
import { useEffect, useState } from 'react';
import { useManageProduct } from '../../../context/ProductContext';
import ProductTable from '../../../components/product_table/ProductTable';
export type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
};
export default function AdminManageProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="py-10 px-10">
        <ProductTable items={state.items} />
      </div>
    </div>
  );
}
