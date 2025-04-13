<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <MobileNavbar />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import MobileNavbar from './components/MobileNavbar.vue';
</script>

<style>
:root {
  --primary-color: #ff6b00;
  --secondary-color: #f5f5f5;
  --accent-color: #ffc107;
  --bg-color: #121212;
  --text-color: #e0e0e0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'Arial', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.main-content {
  padding-top: 80px; /* Match header height */
  min-height: calc(100vh - 80px); /* Ensure content fills viewport minus header */
}

/* Page transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 0 10px;
  }
  
  .main-content {
    padding-bottom: 70px; /* Space for mobile navbar */
  }
}
</style>