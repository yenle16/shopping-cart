import MainLayout from '../components/layout/MainLayout';
import NoHeaderLayout from '../components/layout/NoHeaderLayout';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import { Store } from '../pages/store/Store';

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

export { publicRoutes };
