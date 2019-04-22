
const routes = [
  {
    path: '/',
    component: () => import('layouts/home.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      { path: 'shop', component: () => import('pages/shop.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue'),
  });
}

export default routes;
