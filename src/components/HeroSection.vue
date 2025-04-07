<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-logo">
        <img src="/dark-horse-logo_white.svg" alt="Dark Horse MMA Logo" />
      </div>
      <h1>Dark Horse MMA</h1>
      <p>Профессиональное агентство единоборств с мировым именем</p>
      <a href="#contact" class="cta-button" @click.prevent="scrollToContact">Начать сотрудничество</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    scrollToContact() {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error('Элемент с id="contact" не найден');
      }
    },
  },
};
</script>

<style scoped>
.hero {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/images/hero-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
}

.hero-content {
  width: 100%;
  padding: 10px;
}

.hero-logo {
  width: 240px;
  height: 240px;
  margin: 0 auto 20px;
}

.hero-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero h1 {
  font-size: 4em;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.hero p {
  font-size: 1.5em;
  margin-bottom: 30px;
  max-width: 800px;
  margin: 0 auto 30px;
}

.cta-button {
  display: inline-block;
  padding: 15px 30px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #505050;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5em;
  }
  .hero p {
    font-size: 1.2em;
  }
}
</style>