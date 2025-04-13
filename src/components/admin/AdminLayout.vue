<template>
  <div class="admin-layout">
    <aside class="admin-sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo-container">
          <img src="/logo.svg" alt="Dark Horse Admin" class="logo" />
          <span class="logo-text" v-if="!isSidebarCollapsed">Admin Panel</span>
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
    
    <main class="admin-content">
      <header class="admin-header">
        <div class="breadcrumb">
          <router-link to="/admin/dashboard">Админка</router-link>
          <span v-if="currentPageTitle"> / {{ currentPageTitle }}</span>
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

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
  localStorage.setItem('adminSidebarCollapsed', isSidebarCollapsed.value);
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}

// Закрыть меню при клике вне его
function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
}

// Добавляем обработчик клика при монтировании компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Удаляем обработчик при размонтировании компонента
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleLogout() {
  // Call logout service
  logout();
  
  // Redirect to login page
  router.push('/admin/login');
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Sidebar styles */
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

.logo {
  width: 28px;
  height: 28px;
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
  color: #a2a3b7;
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

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-dark-muted, #4a5568);
}

.breadcrumb a {
  color: var(--text-dark-secondary, #2d3748);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: var(--primary-color, #4F46E5);
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
  color: var(--text-dark, #1e1e2d);
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

@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    width: 260px;
    z-index: 100;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .admin-sidebar.sidebar-visible {
    transform: translateX(0);
  }
  
  .sidebar-collapsed {
    width: 260px;
    transform: translateX(-100%);
  }
  
  .content-wrapper {
    padding: 16px;
  }
  
  .admin-header {
    padding: 12px 16px;
  }
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-dark, #1e1e2d);
}
</style> 