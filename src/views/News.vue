<template>
    <main class="container">
      <section class="news-section">
        <h1>Последние новости</h1>
        <div class="news-grid">
          <article v-for="news in newsItems" :key="news.title" class="news-card">
            <img :src="news.image" :alt="news.alt" class="news-image" />
            <div class="news-content">
              <div class="news-date">{{ news.date }}</div>
              <h2 class="news-title">{{ news.title }}</h2>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <router-link :to="`/news/${news.id}`" class="read-more">Читать далее</router-link>
            </div>
          </article>
        </div>
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: 'News',
    data() {
      return {
        newsItems: [
          {
            id: 'victory-at-dark-horse-fc-5',
            date: '15 июня 2023',
            title: 'Алексей Ильенко одерживает яркую победу на Dark Horse FC 5',
            excerpt: 'В главном событии вечера Алексей Ильенко нокаутировал Ивана Петрова во втором раунде, продемонстрировав великолепную ударную технику.',
            image: 'https://dark-horse.com/images/news/victory.jpg',
            alt: 'Победа Алексея',
          },
          {
            id: 'training-camp-update',
            date: '1 мая 2023',
            title: 'Подготовка к следующему бою идет полным ходом',
            excerpt: 'Алексей Ильенко активно готовится к предстоящему поединку. В тренировочном процессе особое внимание уделяется ударной технике.',
            image: 'https://dark-horse.com/images/news/training.jpg',
            alt: 'Тренировочный процесс',
          },
          {
            id: 'mma-seminar',
            date: '15 апреля 2023',
            title: 'Семинар по ММА от Алексея Ильенко',
            excerpt: 'Алексей провел открытый семинар для начинающих спортсменов, поделившись своим опытом и техническими наработками.',
            image: 'https://dark-horse.com/images/news/seminar.jpg',
            alt: 'Семинар по ММА',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .news-section {
    padding: 40px 0;
  }
  
  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  
  .news-card {
    background: var(--secondary-color);
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
    margin: 0 0 10px;
    font-size: 1.4em;
    color: var(--primary-color);
  }
  
  .news-excerpt {
    margin: 0;
    color: #bbb;
    font-size: 0.95em;
  }
  
  .read-more {
    display: inline-block;
    margin-top: 15px;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .read-more:hover {
    color: var(--accent-color);
  }
  
  @media (max-width: 768px) {
    .news-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>