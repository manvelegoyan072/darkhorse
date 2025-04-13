<template>
  <div class="admin-layout">
    <!-- Мобильный хедер с бургер-меню -->
    <header class="admin-mobile-header">
      <div class="mobile-header-content">
        <router-link to="/" class="mobile-logo-link">
          <img src="/logo_black.svg" alt="Dark Horse" class="mobile-logo" />
        </router-link>
        <button @click="toggleMobileMenu" class="burger-menu" :class="{ 'is-active': isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
    
    <!-- Мобильное меню -->
    <div class="mobile-menu-overlay" v-if="isMobileMenuOpen" @click="toggleMobileMenu"></div>
    <div class="mobile-menu" :class="{ 'is-active': isMobileMenuOpen }">
      <div class="mobile-menu-header">
        <span class="mobile-menu-title">Меню администратора</span>
        <button @click="toggleMobileMenu" class="mobile-menu-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path" 
          class="mobile-nav-item"
          @click="toggleMobileMenu"
        >
          <div class="mobile-nav-icon" v-html="item.icon"></div>
          <span>{{ item.title }}</span>
        </router-link>
        <div class="mobile-nav-divider"></div>
        <router-link to="/" class="mobile-nav-item">
          <div class="mobile-nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span>На сайт</span>
        </router-link>
        <button @click="handleLogout" class="mobile-nav-item mobile-logout-btn">
          <div class="mobile-nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span>Выйти</span>
        </button>
      </nav>
    </div>
    
    <!-- Десктопная боковая панель -->
    <aside class="admin-sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'mobile-hidden': isMobileMenuOpen }">
      <div class="sidebar-header">
        <div class="logo-container">
          <router-link to="/" class="logo-link">
            <img src="/logo.svg" alt="Dark Horse Admin" class="logo" />
            <span class="logo-text" v-if="!isSidebarCollapsed">Admin Panel</span>
          </router-link>
        </div>
        <button @click="toggleSidebar" class="collapse-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline v-if="isSidebarCollapsed" points="13 17 18 12 13 7"></polyline>
            <polyline v-else points="11 17 6 12 11 7"></polyline>
          </svg>
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item" active-class="active" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
          <span v-if="!isSidebarCollapsed">Dashboard</span>
        </router-link>
        
        <router-link to="/admin/fighters" class="nav-item" active-class="active" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span v-if="!isSidebarCollapsed">Бойцы</span>
        </router-link>
        
        <router-link to="/admin/news" class="nav-item" active-class="active" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span v-if="!isSidebarCollapsed">Новости</span>
        </router-link>
        
        <router-link to="/admin/team" class="nav-item" active-class="active" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span v-if="!isSidebarCollapsed">Команда</span>
        </router-link>
        
        <router-link to="/admin/settings" class="nav-item" active-class="active" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span v-if="!isSidebarCollapsed">Настройки</span>
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <router-link to="/" class="nav-item" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span v-if="!isSidebarCollapsed">На сайт</span>
        </router-link>
        
        <button @click="handleLogout" class="nav-item logout-btn" :class="{ 'icon-only': isSidebarCollapsed }">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span v-if="!isSidebarCollapsed">Выйти</span>
        </button>
      </div>
    </aside>
    
    <main class="admin-content" :class="{ 'sidebar-collapsed': isSidebarCollapsed, 'mobile-full': isMobileMenuOpen }">
      <header class="admin-header">
        <div class="breadcrumb">
          <router-link to="/admin/dashboard">Админка</router-link>
          <span v-if="currentPageTitle" class="breadcrumb-title"> / {{ currentPageTitle }}</span>
        </div>
        
        <div class="user-menu">
          <div class="notification-bell">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div class="user-info" @click="toggleUserMenu" ref="userMenuRef">
            <span class="user-name">Admin</span>
            <img src="/placeholder-user.jpg" alt="Admin" class="user-avatar" />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              class="chevron-icon"
              :class="{ 'chevron-up': isUserMenuOpen }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <div class="user-dropdown" v-if="isUserMenuOpen">
              <router-link to="/admin/settings" class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Настройки</span>
              </router-link>
              <button @click="handleLogout" class="dropdown-item logout-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logout } from '../../services/auth';

const route = useRoute();
const router = useRouter();
const isSidebarCollapsed = ref(localStorage.getItem('adminSidebarCollapsed') === 'true');
const isUserMenuOpen = ref(false);
const userMenuRef = ref(null);
const isMobileMenuOpen = ref(false);

// Создаем массив элементов навигации для мобильного меню
const navItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>`
  },
  {
    title: 'Бойцы',
    path: '/admin/fighters',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>`
  },
  {
    title: 'Новости',
    path: '/admin/news',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>`
  },
  {
    title: 'Команда',
    path: '/admin/team',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>`
  },
  {
    title: 'Настройки',
    path: '/admin/settings',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>`
  }
];

const currentPageTitle = computed(() => {
  const routeName = route.name;
  const titles = {
    'admin-dashboard': 'Обзор',
    'admin-fighters': 'Бойцы',
    'admin-fighters-edit': 'Редактирование бойца',
    'admin-fighters-add': 'Добавление бойца',
    'admin-news': 'Новости',
    'admin-news-edit': 'Редактирование новости',
    'admin-news-add': 'Добавление новости',
    'admin-team': 'Команда',
    'admin-team-edit': 'Редактирование члена команды',
    'admin-team-add': 'Добавление члена команды',
    'admin-settings': 'Настройки'
  };
  
  return titles[routeName] || '';
});

// Управление десктопной боковой панелью
function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  localStorage.setItem('adminSidebarCollapsed', isSidebarCollapsed.value);
}

// Управление мобильным меню
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  // Блокировка прокрутки при открытом меню
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Управление меню пользователя
function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

// Закрыть меню пользователя при клике вне его
function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
}

// Закрыть мобильное меню при изменении маршрута
function closeOnRouteChange() {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
}

// Обработчик для выхода
function handleLogout() {
  // Call logout service
  logout();
  
  // Redirect to login page
  router.push('/admin/login');
}

// Обработчики жизненного цикла
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Закрыть мобильное меню при смене маршрута
  router.beforeEach((to, from, next) => {
    closeOnRouteChange();
    next();
  });
  
  // Закрыть мобильное меню при изменении размера экрана
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false;
      document.body.style.overflow = '';
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Мобильный хедер */
.admin-mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1100;
}

.mobile-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.mobile-logo-link {
  display: flex;
  align-items: center;
}

.mobile-logo {
  height: 40px;
  width: auto;
}

/* Бургер-меню кнопка */
.burger-menu {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  position: relative;
  z-index: 1200;
}

.burger-menu span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #121212;
  border-radius: 2px;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
}

.burger-menu span:nth-child(1) {
  top: 2px;
  transform-origin: center;
}

.burger-menu span:nth-child(2) {
  top: 10px;
  transform-origin: center;
}

.burger-menu span:nth-child(3) {
  top: 18px;
  transform-origin: center;
}

.burger-menu.is-active span:nth-child(1) {
  top: 10px;
  transform: rotate(45deg);
}

.burger-menu.is-active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.burger-menu.is-active span:nth-child(3) {
  top: 10px;
  transform: rotate(-45deg);
}

/* Мобильное меню */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1101;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: #fff;
  z-index: 1102;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.mobile-menu.is-active {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-menu-title {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-dark, #1e1e2d);
}

.mobile-menu-close {
  background: none;
  border: none;
  color: var(--text-dark-muted, #4a5568);
  cursor: pointer;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  flex: 1;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #1a1a1a;
  text-decoration: none;
  transition: background-color 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
}

.mobile-nav-item:hover {
  background-color: #f8f9fa;
}

.mobile-nav-item.router-link-active {
  color: #1e1e2d;
  background-color: rgba(30, 30, 45, 0.08);
}

.mobile-nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  color: inherit;
}

.mobile-nav-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 8px 16px;
}

.mobile-logout-btn {
  margin-top: auto;
  color: #EF4444;
}

/* Скрываем мобильный хедер на десктопе и показываем на мобильных устройствах */
@media (max-width: 768px) {
  .admin-mobile-header {
    display: block;
  }
  
  .admin-layout {
    flex-direction: column;
    padding-top: 64px; /* Высота мобильного хедера */
  }
  
  .admin-sidebar {
    display: none !important; /* Force hide sidebar on mobile */
  }
  
  .admin-content {
    margin-left: 0 !important;
    width: 100% !important;
  }
  
  .admin-header {
    padding: 16px !important;
  }
  
  .mobile-full {
    width: 100% !important;
  }
}

/* Боковая панель (десктоп) */
.admin-sidebar {
  width: 260px;
  background-color: #1e1e2d;
  color: #a2a3b7;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.sidebar-collapsed {
  width: 70px;
}

.mobile-hidden {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo {
  width: 56px;
  height: 56px;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.collapse-btn {
  background: transparent;
  border: none;
  color: #a2a3b7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 20px;
  text-decoration: none;
  color: #d1d2e0;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  border-left-color: var(--primary-color, #4F46E5);
}

.icon-only {
  justify-content: center;
  padding: 10px;
}

.sidebar-footer {
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
}

/* Admin content styles */
.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.admin-header {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo-link {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.header-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-dark-muted, #4a5568);
  max-width: 60%;
  overflow: hidden;
}

.breadcrumb a {
  color: var(--text-dark-secondary, #2d3748);
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.breadcrumb a:hover {
  color: var(--primary-color, #4F46E5);
}

.breadcrumb-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-bell {
  position: relative;
  cursor: pointer;
  padding: 4px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  cursor: pointer;
}

.user-name {
  font-weight: 500;
  color: var(--text-dark-secondary, #2d3748);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.chevron-icon {
  color: var(--text-dark-muted, #4a5568);
  transition: transform 0.2s ease;
}

.chevron-up {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 200px;
  z-index: 100;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #111111;
  text-decoration: none;
  transition: background-color 0.2s ease;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.logout-item {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  color: #EF4444;
  border-top: 1px solid #f0f0f0;
}

.content-wrapper {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #111111;
  font-weight: 600;
}
</style> 