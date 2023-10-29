import { NavLink } from 'react-router-dom';
import { IcCartShopping } from '../icons/IcCartShopping';
import { Cart } from '../cart/Cart';
import { useState } from 'react';
import Sidebar from '../cart_sidebar/CartSideBar';
import styles from './Navbar.module.css';
export function Navbar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className={`${styles['navbar']}`}>
      <div className="shadow-sm mx-20 mt-10 flex justify-between stiky top-0 relative">
        <nav className="p-2">
          <NavLink to={'/'} className={'pr-5 text-xl font-bold'}>
            Home
          </NavLink>
          <NavLink to={'/store'} className={'px-5 text-xl font-bold'}>
            Store
          </NavLink>
        </nav>
        <button className="" onClick={toggleSidebar}>
          <Cart />
        </button>
      </div>
      {isSidebarVisible && <Sidebar />}
    </div>
  );
}
