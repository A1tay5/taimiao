import { createRouter, createWebHistory,createWebHashHistory , Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory(''),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  next();
});

export default router;
