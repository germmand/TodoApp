import Layouts from '../layouts';

const indexRoutes = [
  {
    path: '/auth',
    component: Layouts.AuthLayout,
    key: 'authLayout',
  },
  {
    path: '/home',
    component: Layouts.HomeLayout,
    key: 'homeLayout',
  },
  {
    redirect: true,
    path: '/',
    to: '/auth',
    key: 'authRedirect',
  },
];

export default indexRoutes;
