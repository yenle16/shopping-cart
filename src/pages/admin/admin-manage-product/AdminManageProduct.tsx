import * as React from 'react';
import AdminSidebar from '../../../components/admin-sidebar/AdminSidebar';
import { useState } from 'react';
import { Store } from '../../store/Store';

export default function AdminManageProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex flex-col">
          <div className="flex h-screen ">
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
        </div>
      </div>
      <Store />
    </div>
  );
}
