import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../data/api';
import AdminSidebar from '../../../components/admin_sidebar/AdminSidebar';
import UserTable from '../../../components/user_table/UserTable';
import AccountTable from '../../../components/account_table/AccountTable';
export type UserProps = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: any;
  phone: string;
};
export function AdminManageAccount() {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data as UserProps[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
      <div className={`flex-auto mt-20`}>
        <div className="mx-20">
          <h1>User</h1>
          <AccountTable rows={users} />
        </div>
      </div>
    </div>
  );
}
