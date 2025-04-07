<template>
    <main>
      <HeroSection />
      <MissionSection />
      <NewsSection />
      <PartnersSection />
      <ContactSection />
    </main>
  </template>
  
  <script>
  import HeroSection from '../components/HeroSection.vue';
  import MissionSection from '../components/MissionSection.vue';
  import NewsSection from '../components/NewsSection.vue';
  import PartnersSection from '../components/PartnersSection.vue';

  
  export default {
    name: 'Home',
    components: {
      HeroSection,
      MissionSection,
      NewsSection,
      PartnersSection,

    },
  };
  </script>
  
  <style scoped>
  /* Здесь можно добавить стили, специфичные только для Home.vue, если нужно */
  </style>