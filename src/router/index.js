import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/auth';

// Route definitions with lazy loading
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Dark Horse MMA - Главная',
      description: 'Профессиональный клуб MMA, подготовка бойцов мирового уровня'
    }
  },
  {
    path: '/fighters',
    name: 'fighters',
    component: () => import('../views/Fighters.vue'),
    meta: {
      title: 'Dark Horse MMA - Бойцы',
      description: 'Список профессиональных бойцов клуба Dark Horse MMA'
    }
  },
  {
    path: '/fighters/:id',
    name: 'fighter-profile',
    component: () => import('../views/FighterProfile.vue'),
    props: true,
    meta: {
      title: 'Профиль бойца',
      description: 'Детальная информация о бойце клуба Dark Horse MMA'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: {
      title: 'Dark Horse MMA - Новости',
      description: 'Актуальные новости и события из мира ММА и клуба Dark Horse'
    }
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/Team.vue'),
    meta: {
      title: 'Dark Horse MMA - Команда',
      description: 'Тренерский состав и руководство клуба Dark Horse MMA'
    }
  },
  // Admin login route
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/Login.vue'),
    meta: {
      title: 'Вход в админ-панель',
      layout: 'empty'
    }
  },
  // Admin routes
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('../components/admin/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      layout: 'admin'
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: {
          title: 'Админ панель - Обзор',
          requiresAuth: true
        }
      },
      {
        path: 'fighters',
        name: 'admin-fighters',
        component: () => import('../views/admin/FightersList.vue'),
        meta: {
          title: 'Админ панель - Бойцы',
          requiresAuth: true
        }
      },
      {
        path: 'fighters/add',
        name: 'admin-fighters-add',
        component: () => import('../views/admin/FighterForm.vue'),
        meta: {
          title: 'Админ панель - Добавление бойца',
          requiresAuth: true
        }
      },
      {
        path: 'fighters/edit/:id',
        name: 'admin-fighters-edit',
        component: () => import('../views/admin/FighterForm.vue'),
        props: true,
        meta: {
          title: 'Админ панель - Редактирование бойца',
          requiresAuth: true
        }
      },
      {
        path: 'news',
        name: 'admin-news',
        component: () => import('../views/admin/NewsList.vue'),
        meta: {
          title: 'Админ панель - Новости',
          requiresAuth: true
        }
      },
      {
        path: 'news/add',
        name: 'admin-news-add',
        component: () => import('../views/admin/NewsForm.vue'),
        meta: {
          title: 'Админ панель - Добавление новости',
          requiresAuth: true
        }
      },
      {
        path: 'news/edit/:id',
        name: 'admin-news-edit',
        component: () => import('../views/admin/NewsForm.vue'),
        props: true,
        meta: {
          title: 'Админ панель - Редактирование новости',
          requiresAuth: true
        }
      },
      {
        path: 'team',
        name: 'admin-team',
        component: () => import('../views/admin/TeamList.vue'),
        meta: {
          title: 'Админ панель - Команда',
          requiresAuth: true
        }
      },
      {
        path: 'team/add',
        name: 'admin-team-add',
        component: () => import('../views/admin/TeamForm.vue'),
        meta: {
          title: 'Админ панель - Добавление члена команды',
          requiresAuth: true
        }
      },
      {
        path: 'team/edit/:id',
        name: 'admin-team-edit',
        component: () => import('../views/admin/TeamForm.vue'),
        props: true,
        meta: {
          title: 'Админ панель - Редактирование члена команды',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('../views/admin/Settings.vue'),
        meta: {
          title: 'Админ панель - Настройки',
          requiresAuth: true
        }
      }
    ]
  },
  // Fallback route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Страница не найдена'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return { top: 0 };
    }
  }
});

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Dark Horse MMA';
  
  // You could also update meta description here
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '');
  }
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login page
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;