<template>
  <main class="container not-found">
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <p>К сожалению, запрашиваемая страница не существует или была перемещена.</p>
    <router-link to="/" class="home-button">Вернуться на главную</router-link>
  </main>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 8rem;
  margin: 0;
  color: var(--accent-color);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

h2 {
  font-size: 2rem;
  margin: 0 0 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #aaa;
}

.home-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: var(--secondary-color);
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.home-button:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
}
</style> 