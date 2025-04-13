<template>
  <div class="mobile-navbar" :class="{ 'visible': isVisible }">
    <nav>
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path" 
        class="nav-item"
        :class="{ 'active': isActive(item.path) }"
      >
        <div class="nav-icon" v-html="item.icon"></div>
        <span class="nav-label">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true
  }
});

const route = useRoute();

// Navigation items with SVG icons
const navItems = [
  {
    name: 'Главная',
    path: '/',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>`
  },
  {
    name: 'Бойцы',
    path: '/fighters',
    icon: `<img src="/fightes_icon.svg" alt="Бойцы" width="24" height="24" />`
  },
  {
    name: 'Новости',
    path: '/news',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            <path d="M18 14h-8"></path>
            <path d="M15 18h-5"></path>
            <path d="M10 6h8v4h-8V6Z"></path>
          </svg>`
  },
  {
    name: 'Команда',
    path: '/team',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>`
  }
];

// Check if current route matches the nav item path
const isActive = (path) => {
  if (path === '/') {
    return route.path === path;
  }
  return route.path.startsWith(path);
};
</script>

<style scoped>
.mobile-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-color);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 900;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-navbar.visible {
  transform: translateY(0);
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  color: var(--text-color);
  text-decoration: none;
  width: 25%;
  transition: all 0.2s ease;
}

.nav-item.active {
  color: var(--accent-color);
}

.nav-icon {
  margin-bottom: 5px;
  width: 24px;
  height: 24px;
}

.nav-icon svg {
  width: 100%;
  height: 100%;
}

.nav-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  vertical-align: middle;
}

.nav-label {
  font-size: 0.75rem;
  text-align: center;
}

/* Show only on mobile devices */
@media (min-width: 769px) {
  .mobile-navbar {
    display: none;
  }
}

/* Adjust for devices with bottom safe area (like iPhone X and newer) */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-navbar {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Улучшенная мобильная адаптация */
@media (max-width: 380px) {
  .nav-item {
    padding: 6px 0;
  }
  
  .nav-icon {
    width: 20px;
    height: 20px;
  }
  
  .nav-icon img,
  .nav-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .nav-label {
    font-size: 0.7rem;
  }
}
</style> 