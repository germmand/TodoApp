import AuthViews from '../views/auth';

const authRoutes = [
  {
    path: '/auth/login',
    component: AuthViews.Login,
    key: 'loginView',
  },
  {
    redirect: true,
    path: '/auth',
    to: '/auth/login',
    key: 'loginRedirect',
  },
];

export default authRoutes;
