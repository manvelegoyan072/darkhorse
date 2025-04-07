<template>
  <section class="partners-section">
    <div class="container">
      <div class="section-title">
        <h2>Наши партнёры</h2>
      </div>
      <div class="partners-grid">
        <img v-for="partner in partners" :key="partner.alt" :src="partner.src" :alt="partner.alt" class="partner-logo">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PartnersSection',
  data() {
    return {
      partners: [
        { src: '/news/ufc.jpg', alt: 'Логотип UFC' },
        { src: '/news/pfl.jpg', alt: 'Логотип PFL' },
        { src: '/news/efc.jpg', alt: 'Логотип Eagle FC' },
        { src: '/news/aca.jpg', alt: 'Логотип ACA' },
        { src: '/news/amc.png', alt: 'Логотип AMC Fight Nights' },
      ],
    };
  },
};
</script>

<style scoped>
.partners-section {
  padding: 80px 0;
  background-color: var(--bg-color);
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
  transition: filter 0.3s ease;
}

.partner-logo:hover {
  filter: grayscale(0) brightness(1);
}
</style>