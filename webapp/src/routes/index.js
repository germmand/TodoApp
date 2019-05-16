import Layouts from '../layouts';

const indexRoutes = [
  {
    path: '/auth',
    component: Layouts.AuthLayout,
    key: 'authLayout',
  },
  {
    redirect: true,
    path: '/',
    to: '/auth',
    key: 'authRedirect',
  },
];

export default indexRoutes;
