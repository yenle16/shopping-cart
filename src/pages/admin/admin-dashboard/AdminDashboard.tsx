import * as React from 'react';
import AdminSidebar from '../../../components/admin-sidebar/AdminSidebar';
import { useState } from 'react';

export default function AdminDashBoard() {
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
      <h1>Dashboard</h1>
    </div>
  );
}
