import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, []);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('userToken');
    navigate('/admin/login', { replace: true });
  };
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-sky-950 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 text-4xl text-white text-center m-6 font-bold">
        <NavLink to="/">MyStore</NavLink>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admin/manage-user"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-50 duration-300 ease-in-out dark:hover:bg-meta-4}`}
                >
                  Manage Users
                </NavLink>
              </li>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admin/manage-product"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-50 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                >
                  Manage Products
                </NavLink>
              </li>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admin/manage-invoice"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-50 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                >
                  Manage Invoices
                </NavLink>
              </li>
            </ul>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <button
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-50 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
