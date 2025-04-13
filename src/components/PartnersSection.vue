<template>
  <section class="partners-section">
    <div class="container">
      <div class="section-title">
        <h2>Наши партнёры</h2>
        <div class="section-subtitle">Мы сотрудничаем с ведущими организациями в мире MMA</div>
      </div>
      <div class="partners-grid">
        <img 
          v-for="partner in partners" 
          :key="partner.alt" 
          :src="partner.src" 
          :alt="partner.alt" 
          class="partner-logo"
          loading="lazy"
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const partners = ref([
  { src: '/news/ufc.jpg', alt: 'Логотип UFC' },
  { src: '/news/pfl.jpg', alt: 'Логотип PFL' },
  { src: '/news/efc.jpg', alt: 'Логотип Eagle FC' },
  { src: '/news/aca.jpg', alt: 'Логотип ACA' },
  { src: '/news/amc.png', alt: 'Логотип AMC Fight Nights' },
]);
</script>

<style scoped>
.partners-section {
  padding: 80px 0;
  background-color: var(--bg-color);
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.section-title h2 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.section-subtitle {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1.1rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 40px;
  align-items: center;
  margin-top: 40px;
}

.partner-logo {
  width: 100%;
  height: auto;
  filter: grayscale(1) brightness(1.5);
  transition: all 0.3s ease;
}

.partner-logo:hover {
  filter: grayscale(0) brightness(1);
  transform: scale(1.05);
}

/* Mobile Responsive Adjustments */
@media (max-width: 992px) {
  .partners-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .partners-section {
    padding: 60px 0;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .partners-section {
    padding: 40px 0;
  }
  
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>