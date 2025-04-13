<template>
  <section class="mission-section">
    <div class="background-slideshow">
      <div 
        v-for="(image, index) in backgroundImages" 
        :key="index" 
        class="slide" 
        :class="{ active: currentSlide === index }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="overlay"></div>
    </div>
    <div class="container">
      <div class="section-title">
        <h2>Наша миссия</h2>
      </div>
      <div class="mission-content">
        <p class="mission-text">Dark Horse MMA - это профессиональное агентство, специализирующееся на развитии карьеры бойцов ММА. Мы предоставляем полный спектр услуг: от тренировочного процесса до организации боев и медиа-сопровождения.</p>
        <p class="mission-text">Наша цель - помочь талантливым спортсменам достичь вершин в мире смешанных единоборств, обеспечивая их всесторонней поддержкой и профессиональным менеджментом.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Background images for slideshow
const backgroundImages = [
  '/images/mma1.jpg',
  '/images/mma2.jpg',
  '/images/mma3.jpg',
  '/images/mma4.jpg',
  '/images/mma5.jpg'
];

const currentSlide = ref(0);
let slideInterval = null;

// Function to advance the slideshow
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % backgroundImages.length;
};

// Set up slideshow on component mount
onMounted(() => {
  // Start the slideshow with a 5 second interval
  slideInterval = setInterval(nextSlide, 5000);
});

// Clean up on component unmount
onBeforeUnmount(() => {
  // Clear the interval when the component is destroyed
  if (slideInterval) clearInterval(slideInterval);
});
</script>

<style scoped>
.mission-section {
  padding: 100px 0;
  position: relative;
  color: white;
  min-height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.background-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.slide.active {
  opacity: 1;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.container {
  position: relative;
  z-index: 3;
  width: 100%;
}

.mission-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
}

.mission-text {
  font-size: 1.2em;
  margin-bottom: 30px;
  color: white;
  line-height: 1.6;
}

.mission-text:last-child {
  margin-bottom: 0;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.section-title h2 {
  color: var(--primary-color);
  font-size: 2.5em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .mission-section {
    padding: 80px 0;
  }
  
  .mission-content {
    padding: 20px;
  }
  
  .section-title h2 {
    font-size: 2em;
  }
  
  .mission-text {
    font-size: 1.1em;
  }
}
</style>