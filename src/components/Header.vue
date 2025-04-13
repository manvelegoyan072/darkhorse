<template>
  <header>
    <nav class="container">
      <div class="logo">
        <router-link to="/">
          <img src="/dark-horse-logo_white.svg" alt="Dark Horse Logo">
        </router-link>
        <span>Dark Horse</span>
      </div>
      
      <!-- Improved burger menu button with animation -->
      <button 
        class="menu-toggle" 
        :class="{ 'is-active': menuOpen }" 
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <!-- Improved mobile navigation -->
      <div class="nav-overlay" v-if="menuOpen" @click="closeMenu"></div>
      <ul :class="{ 'nav-links': true, 'is-active': menuOpen }">
        <li v-for="(item, index) in navItems" :key="index">
          <router-link 
            v-if="!item.isExternal" 
            :to="item.path" 
            @click="closeMenu"
            :class="{ 'active': route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
          <a 
            v-else 
            :href="item.path" 
            @click="closeMenu"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const menuOpen = ref(false);
const route = useRoute();

// Navigation items
const navItems = [
  { name: 'Главная', path: '/', isExternal: false },
  { name: 'Бойцы', path: '/fighters', isExternal: false },
  { name: 'Команда', path: '/team', isExternal: false },
  { name: 'Новости', path: '/news', isExternal: false },
  { name: 'Контакты', path: '/#contact', isExternal: true }
];

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  updateBodyScroll();
};

const closeMenu = () => {
  menuOpen.value = false;
  updateBodyScroll();
};

const updateBodyScroll = () => {
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
};

// Get scrollbar width to prevent layout shift when locking scroll
const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

// Close menu when route changes
watch(() => route.path, () => {
  closeMenu();
});

// Close menu on ESC key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu();
  }
};

// Close menu when window is resized to desktop size
const handleResize = () => {
  if (window.innerWidth > 768 && menuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('resize', handleResize);
  // Ensure body scroll is restored when component is unmounted
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
});
</script>

<style scoped>
header {
  background-color: var(--bg-color);
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1001; /* Increase z-index to stay above the menu */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1001; /* Keep logo above mobile menu */
}

.logo img {
  height: 80px;
  width: auto;
}

.logo span {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--primary-color);
}

/* Burger Menu Button Styles */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001; /* Keep button above mobile menu */
  width: 40px;
  height: 40px;
  position: relative;
  transition: all 0.3s ease;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  margin: 5px 0;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Animated burger icon */
.menu-toggle.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  width: 80%;
}

.nav-overlay {
  display: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  header {
    padding: 15px 0;
    background-color: var(--bg-color); /* Ensure header background is consistent */
  }
  
  .menu-toggle {
    display: block;
  }

  .nav-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998; /* Below header but above content */
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease;
  }

  .nav-links {
    display: flex;
    position: fixed;
    top: 80px; /* Start below the header */
    right: -100%;
    width: 75%;
    max-width: 320px;
    height: calc(100vh - 80px); /* Adjust height to account for header */
    background: var(--secondary-color); /* Different color from header */
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Start from top */
    margin: 0;
    padding: 30px;
    z-index: 999; /* Between header and overlay */
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
    transition: right 0.3s ease;
    overflow-y: auto; /* Allow scrolling if menu is too tall */
  }

  .nav-links.is-active {
    right: 0;
    animation: slideIn 0.3s ease;
  }

  .nav-links li {
    margin: 15px 0;
    width: 100%;
    text-align: center;
  }

  .nav-links a {
    font-size: 1.2rem;
    display: block;
    padding: 10px;
    width: 100%;
  }

  .nav-links a::after {
    bottom: 5px;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>