<template>
  <header>
    <nav class="container">
      <div class="logo">
        <img src="/dark-horse-logo_white.svg" alt="Dark Horse Logo">
        <span>Dark Horse</span>
      </div>
      <button class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul :class="{ 'nav-links': true, 'active': menuOpen }">
        <button class="close-menu" @click="toggleMenu">✕</button>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/fighters">Бойцы</router-link></li>
        <li><router-link to="/team">Команда</router-link></li>
        <li><router-link to="/news">Новости</router-link></li>
        <li><a href="/#contact">Контакты</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--bg-color);
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  margin: 5px 0;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
}

.close-menu {
  display: none;
}

/* Мобильные стили */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: var(--bg-color);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .nav-links.active {
    display: flex;
  }

  .close-menu {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: 2em;
    cursor: pointer;
  }

  .nav-links li {
    margin: 20px 0;
  }

  .nav-links a {
    font-size: 1.5em;
  }
}
</style>