<template>
  <main>
    <section class="news-section">
      <div class="container">
        <div class="section-title">
          <h2>Новости</h2>
          <p>Актуальные события и новости из мира смешанных единоборств</p>
        </div>
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
  padding: 60px 0;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  font-size: 2.5em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.section-title p {
  font-size: 1.2em;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
}

.news-card {
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
  border-bottom: 2px solid var(--accent-color);
}

.news-card:hover .news-image {
  transform: scale(1.05);
}

.news-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
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
  color: var(--text-color);
  font-size: 0.95em;
}

.read-more {
  display: inline-block;
  margin-top: auto;
  padding: 10px 15px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.read-more:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 10px;
  }
  .section-title h2 {
    font-size: 2em;
  }
  .section-title p {
    font-size: 1em;
    padding: 0 20px;
  }
}
</style>