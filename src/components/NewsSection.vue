<template>
    <section class="news-section">
      <div class="container">
        <div class="section-title">
        <h2>{{ title }}</h2>
        <div class="section-subtitle" v-if="subtitle">{{ subtitle }}</div>
      </div>
      
      <!-- Loading state -->
      <div v-if="loading" class="loading-indicator">
        <div class="loading-spinner"></div>
        <p>Загрузка новостей...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="error-message">
        <div class="error-icon">!</div>
        <p>{{ error }}</p>
        <button @click="retryLoading" class="retry-button">Повторить</button>
      </div>
      
      <!-- Empty state -->
      <div v-else-if="!newsItems.length" class="empty-state">
        <p>Новости отсутствуют</p>
      </div>
      
      <!-- Content -->
      <div v-else>
        <transition-group name="news-list" tag="div" class="news-grid">
          <div 
            v-for="(news, index) in displayedNews" 
            :key="index" 
            class="news-card"
            :class="{ 'featured': news.featured }"
          >
            <div class="news-card-inner">
              <div class="news-image-container">
                <img 
                  :src="news.image" 
                  :alt="news.alt || news.title" 
                  class="news-image"
                  @error="handleImageError"
                  loading="lazy"
                >
                <div class="news-date">{{ formatDate(news.date) }}</div>
        </div>
            <div class="news-content">
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
                <div class="news-footer">
                  <button v-if="news.link" class="news-read-more" @click="openNewsLink(news)">
                    Читать полностью
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

        <div v-if="!loading && maxItems < newsItems.length" class="news-footer">
          <button @click="showMoreNews" class="show-more-btn">
            <span>Показать больше</span>
            <span class="remaining-count">{{ newsItems.length - maxItems }}</span>
          </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { newsItems as defaultNewsItems } from '../data/homeData.js';

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Последние новости'
  },
  subtitle: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  initialItemsToShow: {
    type: Number,
    default: 3
  }
});

// State
const loading = ref(true);
const error = ref(null);
const newsItems = ref([]);
const maxItems = ref(props.initialItemsToShow);

// Computed
const displayedNews = computed(() => {
  return newsItems.value.slice(0, maxItems.value);
});

// Methods
const showMoreNews = () => {
  // Add more items with a small delay for animation
  setTimeout(() => {
    const newMax = Math.min(maxItems.value + props.initialItemsToShow, newsItems.value.length);
    maxItems.value = newMax;
  }, 100);
};

const handleImageError = (event) => {
  event.target.src = '/placeholder-image.jpg'; // Fallback image
};

const retryLoading = async () => {
  error.value = null;
  loading.value = true;
  await loadData();
};

const formatDate = (dateString) => {
  // Simple formatting, could be enhanced with a library like date-fns
  if (!dateString) return '';
  
  // If already formatted, return as is
  if (typeof dateString === 'string' && dateString.includes(' ')) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (err) {
    console.error('Date formatting error:', err);
    return dateString;
  }
};

const openNewsLink = (news) => {
  if (news.link) {
    window.open(news.link, '_blank');
  }
};

const loadData = async () => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use props.items if provided, otherwise use default
    newsItems.value = props.items.length > 0 ? props.items : defaultNewsItems;
    loading.value = false;
  } catch (err) {
    error.value = 'Не удалось загрузить новости. Пожалуйста, попробуйте позже.';
    loading.value = false;
    console.error('Error loading news:', err);
  }
};

// Lifecycle hooks
onMounted(async () => {
  await loadData();
});
  </script>
  
  <style scoped>
  .news-section {
    padding: 80px 0;
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }
  
.section-title {
  text-align: center;
  margin-bottom: 40px;
}

.section-title h2 {
    color: var(--secondary-color);
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

/* Grid Layout */
  .news-grid {
    display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
/* Card Design */
  .news-card {
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  backface-visibility: hidden;
  transform: translateZ(0);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.news-card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
    background: var(--bg-color);
  border-radius: 12px;
  }
  
  .news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.news-image-container {
  position: relative;
  overflow: hidden;
  }
  
  .news-image {
    width: 100%;
  height: 220px;
    object-fit: cover;
  transition: transform 0.5s ease;
  transform-origin: center;
}

.news-card:hover .news-image {
  transform: scale(1.05);
}

.news-date {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 15px;
  font-size: 0.85rem;
  border-top-right-radius: 8px;
  }
  
  .news-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-title {
  color: var(--primary-color);
  font-size: 1.3rem;
  margin-bottom: 15px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-excerpt {
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-footer {
  margin-top: auto;
  display: flex;
  justify-content: center;
}

/* Featured Article */
.news-card.featured {
  grid-column: span 2;
}

.news-card.featured .news-card-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.news-card.featured .news-image-container {
  height: 100%;
}

.news-card.featured .news-image {
  height: 100%;
}

/* Button Styles */
.news-read-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-read-more:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  transform: translateY(-2px);
}

.show-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 40px auto 0;
  padding: 12px 25px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.show-more-btn:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  transform: translateY(-2px);
}

.remaining-count {
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Loading, Error and Empty States */
.loading-indicator,
.error-message,
.empty-state {
  text-align: center;
  padding: 50px 20px;
  margin: 30px 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--secondary-color);
  animation: spin 1s ease-in-out infinite;
}

.error-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.retry-button {
  margin-top: 15px;
  padding: 8px 20px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: white;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* List transitions */
.news-list-enter-active,
.news-list-leave-active {
  transition: all 0.5s ease;
}

.news-list-enter-from,
.news-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Mobile Responsive Adjustments */
@media (max-width: 992px) {
  .news-card.featured {
    grid-column: span 1;
  }
  
  .news-card.featured .news-card-inner {
    display: flex;
    flex-direction: column;
  }
  
  .news-card.featured .news-image {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .news-section {
    padding: 60px 0;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
  
  .news-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .news-title {
    font-size: 1.2rem;
  }
  
  .news-excerpt {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .news-section {
    padding: 40px 0;
  }
  
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .news-image {
    height: 180px;
  }
  
  .news-content {
    padding: 20px;
  }
  }
  </style>