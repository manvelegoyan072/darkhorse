<template>
  <div class="news-management">
    <div class="page-header">
      <h1>Управление новостями</h1>
      <BaseButton @click="$router.push('/admin/news/add')" icon="plus">
        Добавить новость
      </BaseButton>
    </div>
    
    <div class="filters">
      <div class="search">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Поиск новостей..."
          class="search-input"
        />
      </div>
      
      <div class="filter-group">
        <label for="category">Категория:</label>
        <select v-model="filters.category" id="category" class="filter-select">
          <option value="">Все</option>
          <option value="tournament">Турниры</option>
          <option value="interview">Интервью</option>
          <option value="announcement">Анонсы</option>
          <option value="article">Статьи</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="status">Статус:</label>
        <select v-model="filters.status" id="status" class="filter-select">
          <option value="">Все</option>
          <option value="published">Опубликованные</option>
          <option value="draft">Черновики</option>
        </select>
      </div>
      
      <BaseButton @click="resetFilters" type="secondary" class="reset-filters">
        Сбросить
      </BaseButton>
    </div>
    
    <div class="news-grid">
      <div v-for="news in paginatedNews" :key="news.id" class="news-card">
        <div class="news-image">
          <img :src="news.image" :alt="news.title" />
          <span class="news-category" :class="getCategoryClass(news.category)">
            {{ getCategoryLabel(news.category) }}
          </span>
        </div>
        
        <div class="news-content">
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-excerpt">{{ news.excerpt }}</p>
          
          <div class="news-meta">
            <div class="date">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ formatDate(news.date) }}
            </div>
            
            <div class="status">
              <span class="status-badge" :class="getStatusClass(news.status)">
                {{ news.status === 'draft' ? 'Черновик' : 'Опубликовано' }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="news-actions">
          <button @click="editNews(news.id)" class="action-btn edit-btn" title="Редактировать">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Редактировать
          </button>
          
          <button v-if="news.status === 'draft'" @click="publishNews(news.id)" class="action-btn publish-btn" title="Опубликовать">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Опубликовать
          </button>
          
          <button @click="deleteNews(news.id)" class="action-btn delete-btn" title="Удалить">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Удалить
          </button>
        </div>
      </div>
      
      <div v-if="paginatedNews.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <h3>Новости не найдены</h3>
        <p>Попробуйте изменить параметры поиска или создайте новую новость</p>
        <BaseButton @click="$router.push('/admin/news/add')" icon="plus">
          Добавить новость
        </BaseButton>
      </div>
    </div>
    
    <div class="pagination">
      <button 
        class="pagination-btn" 
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <span class="page-indicator">Страница {{ currentPage }} из {{ totalPages }}</span>
      <button 
        class="pagination-btn" 
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Подтвердите удаление</h3>
        </div>
        <div class="modal-body">
          <p>Вы уверены, что хотите удалить эту новость? Это действие нельзя отменить.</p>
        </div>
        <div class="modal-footer">
          <BaseButton @click="cancelDelete" type="secondary">Отмена</BaseButton>
          <BaseButton @click="confirmDelete" type="danger">Удалить</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 6;
const searchQuery = ref('');
const filters = ref({
  category: '',
  status: ''
});
const showDeleteConfirm = ref(false);
const newsToDelete = ref(null);

// Mock data for demonstration
const newsItems = ref([
  {
    id: 1,
    title: 'Хабиб Нурмагомедов проведет семинар в Москве',
    excerpt: 'Бывший чемпион UFC в легком весе Хабиб Нурмагомедов проведет мастер-класс для спортсменов школы единоборств Dark Horse.',
    content: '...',
    date: '2023-10-15',
    category: 'announcement',
    status: 'published',
    image: '/news/seminar.jpg'
  },
  {
    id: 2,
    title: 'Анонс турнира Dark Horse Fighting Championship 3',
    excerpt: 'Третий турнир промоушена Dark Horse Fighting Championship пройдет 20 ноября в Москве.',
    content: '...',
    date: '2023-09-20',
    category: 'tournament',
    status: 'published',
    image: '/news/tournament.jpg'
  },
  {
    id: 3,
    title: 'Интервью с Петром Яном перед возвращением в октагон',
    excerpt: 'Эксклюзивное интервью с экс-чемпионом UFC в легчайшем весе Петром Яном перед его следующим боем.',
    content: '...',
    date: '2023-09-10',
    category: 'interview',
    status: 'published',
    image: '/news/interview.jpg'
  },
  {
    id: 4,
    title: 'Подготовка к турниру: первая часть',
    excerpt: 'Как готовятся бойцы к предстоящему турниру. Тренировки, питание, ментальная подготовка.',
    content: '...',
    date: '2023-08-25',
    category: 'article',
    status: 'draft',
    image: '/news/preparation.jpg'
  },
  {
    id: 5,
    title: 'Итоги турнира Dark Horse Fighting Championship 2',
    excerpt: 'Обзор и результаты всех поединков второго турнира Dark Horse Fighting Championship.',
    content: '...',
    date: '2023-08-15',
    category: 'tournament',
    status: 'published',
    image: '/news/results.jpg'
  },
  {
    id: 6,
    title: 'Правила и техника борьбы в партере',
    excerpt: 'Детальный разбор основных техник и приемов борьбы в партере для начинающих спортсменов.',
    content: '...',
    date: '2023-08-05',
    category: 'article',
    status: 'draft',
    image: '/news/technique.jpg'
  },
  {
    id: 7,
    title: 'Интервью с главным тренером команды',
    excerpt: 'Беседа с главным тренером о планах развития команды, целях и новых методиках тренировок.',
    content: '...',
    date: '2023-07-20',
    category: 'interview',
    status: 'published',
    image: '/news/coach.jpg'
  },
  {
    id: 8,
    title: 'Набор в детскую секцию MMA',
    excerpt: 'Открыт набор детей от 6 до 12 лет в секцию ММА под руководством опытных тренеров.',
    content: '...',
    date: '2023-07-10',
    category: 'announcement',
    status: 'published',
    image: '/news/kids.jpg'
  }
]);

// Computed properties
const filteredNews = computed(() => {
  let result = [...newsItems.value];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(news => 
      news.title.toLowerCase().includes(query) || 
      news.excerpt.toLowerCase().includes(query)
    );
  }
  
  // Apply category filters
  if (filters.value.category) {
    result = result.filter(news => news.category === filters.value.category);
  }
  
  if (filters.value.status) {
    result = result.filter(news => news.status === filters.value.status);
  }
  
  // Sort by date (newest first)
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return result;
});

const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredNews.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredNews.value.length / itemsPerPage);
});

// Methods
function resetFilters() {
  searchQuery.value = '';
  filters.value = {
    category: '',
    status: ''
  };
  currentPage.value = 1;
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function getCategoryLabel(category) {
  const labels = {
    'tournament': 'Турниры',
    'interview': 'Интервью',
    'announcement': 'Анонсы',
    'article': 'Статьи'
  };
  return labels[category] || category;
}

function getCategoryClass(category) {
  return category;
}

function getStatusClass(status) {
  return status === 'published' ? 'published' : 'draft';
}

function editNews(id) {
  router.push(`/admin/news/edit/${id}`);
}

function publishNews(id) {
  // Here you would make an API call to publish the news
  console.log(`Publishing news with ID: ${id}`);
  
  // For demo purposes, we're just updating the local state
  const newsIndex = newsItems.value.findIndex(item => item.id === id);
  if (newsIndex !== -1) {
    newsItems.value[newsIndex].status = 'published';
  }
}

function deleteNews(id) {
  newsToDelete.value = id;
  showDeleteConfirm.value = true;
}

function cancelDelete() {
  showDeleteConfirm.value = false;
  newsToDelete.value = null;
}

function confirmDelete() {
  // Here you would make an API call to delete the news
  console.log(`Deleting news with ID: ${newsToDelete.value}`);
  
  // For demo purposes, we're just removing from local array
  const newsIndex = newsItems.value.findIndex(item => item.id === newsToDelete.value);
  if (newsIndex !== -1) {
    newsItems.value.splice(newsIndex, 1);
  }
  
  showDeleteConfirm.value = false;
  newsToDelete.value = null;
}
</script>

<style scoped>
.news-management {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 1.8rem;
  margin: 0;
  color: #111111;
  font-weight: 600;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}

.filter-group label {
  font-size: 0.85rem;
  color: #64748b;
}

.filter-select {
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #fff;
}

.reset-filters {
  align-self: flex-end;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.news-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.news-image {
  position: relative;
  height: 180px;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-category {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.news-category.tournament {
  background-color: #4F46E5;
}

.news-category.interview {
  background-color: #059669;
}

.news-category.announcement {
  background-color: #F59E0B;
}

.news-category.article {
  background-color: #7C3AED;
}

.news-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-title {
  margin: 0 0 8px;
  font-size: 1.1rem;
  line-height: 1.4;
  color: var(--text-color, #1e1e2d);
}

.news-excerpt {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: #94a3b8;
}

.status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.published {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.draft {
  background-color: rgba(100, 116, 139, 0.1);
  color: #64748b;
}

.news-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #f1f5f9;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.edit-btn {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4F46E5;
  flex: 1;
}

.edit-btn:hover {
  background-color: rgba(79, 70, 229, 0.2);
}

.publish-btn {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10B981;
  flex: 1;
}

.publish-btn:hover {
  background-color: rgba(16, 185, 129, 0.2);
}

.delete-btn {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  flex: 1;
}

.delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.empty-state svg {
  color: #94a3b8;
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: var(--text-color, #1e1e2d);
}

.empty-state p {
  margin: 0 0 20px;
  font-size: 0.95rem;
  color: #64748b;
  text-align: center;
  max-width: 400px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f8fafc;
  border-color: #cbd5e1;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 0.9rem;
  color: #64748b;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: var(--text-color, #1e1e2d);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 12px;
  }
  
  .filter-group, .search {
    width: 100%;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .news-actions {
    flex-wrap: wrap;
  }
}
</style> 