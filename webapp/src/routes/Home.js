import HomeViews from '../views/Home';

const homeRoutes = [
  {
    path: '/home/Dashboard',
    component: HomeViews.Dashboard,
    key: 'dashboardView',
  },
  {
    redirect: true,
    path: '/home',
    to: '/home/Dashboard',
    key: 'dashboardRedirect',
  },
];

export default homeRoutes;
