import AuthViews from '../views/Auth';

const authRoutes = [
  {
    path: '/auth/login',
    component: AuthViews.Login,
    key: 'loginView',
  },
  {
    path: '/auth/signup',
    component: AuthViews.Signup,
    key: 'signupView',
  },
  {
    redirect: true,
    path: '/auth',
    to: '/auth/login',
    key: 'loginRedirect',
  },
];

export default authRoutes;
