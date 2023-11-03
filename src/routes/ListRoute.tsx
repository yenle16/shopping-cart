import MainLayout from '../components/layout/MainLayout';
import NoHeaderLayout from '../components/layout/NoHeaderLayout';
import AdminDashBoard from '../pages/admin/admin-dashboard/AdminDashboard';
import { AdminManageUser } from '../pages/admin/admin-manage-user/AdminManageUser';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';
import { Store } from '../pages/store/Store';
import AdminManageProduct from '../pages/admin/admin-manage-product/AdminManageProduct';
import { AdminManageAccount } from '../pages/admin/admin-Account/AdminManageAccount';

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/home',
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/store',
    component: Store,
    layout: MainLayout,
  },
  {
    path: 'admin/login',
    component: Login,
    layout: NoHeaderLayout,
  },
];
const protectedRoutes = [
  {
    path: '/admin',
    component: AdminDashBoard,
    layout: NoHeaderLayout,
  },
  {
    path: '/admin/dashboard',
    component: AdminDashBoard,
    layout: NoHeaderLayout,
  },
  {
    path: '/admin/manage-product',
    component: AdminManageProduct,
    layout: NoHeaderLayout,
  },
  {
    path: '/admin/manage-user',
    component: AdminManageUser,
    layout: NoHeaderLayout,
  },
];
export { publicRoutes, protectedRoutes };
