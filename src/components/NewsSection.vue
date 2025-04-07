<template>
    <section class="news-section">
      <div class="container">
        <div class="section-title">
          <h2>Последние новости</h2>
        </div>
        <div class="news-grid">
          <div v-for="news in newsItems" :key="news.title" class="news-card">
            <img :src="news.image" :alt="news.alt" class="news-image">
            <div class="news-content">
              <div class="news-date">{{ news.date }}</div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { newsItems } from '../data/homeData.js';
  
  export default {
    name: 'NewsSection',
    data() {
      return {
        newsItems,
      };
    },
  };
  </script>
  
  <style scoped>
  .news-section {
    padding: 80px 0;
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }
  
  .news-section .section-title h2 {
    color: var(--secondary-color);
  }
  
  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .news-card {
    background: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  
  .news-card:hover {
    transform: translateY(-5px);
  }
  
  .news-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .news-content {
    padding: 20px;
  }
  
  .news-date {
    color: #888;
    font-size: 0.9em;
    margin-bottom: 10px;
  }
  
  .news-title {
    color: var(--primary-color);
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .news-excerpt {
    color: var(--text-color);
    font-size: 0.9em;
  }
  </style>