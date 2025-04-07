import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Fighters from '../views/Fighters.vue';
import News from '../views/News.vue';
import Team from '../views/Team.vue';
import FighterProfile from '../views/FighterProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/fighters', component: Fighters },
  { path: '/news', component: News },
  { path: '/team', component: Team },
  { path: '/fighters/:id', component: FighterProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;