<template>
  <div class="admin-dashboard">
    <div class="page-header">
      <h1>Панель управления</h1>
      <p class="last-updated">Последнее обновление: {{ formatDate(new Date()) }}</p>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon fighter-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>Бойцы</h3>
          <div class="stat-value">{{ stats.fighters }}</div>
          <div class="stat-description">Всего в базе</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon news-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>Новости</h3>
          <div class="stat-value">{{ stats.news }}</div>
          <div class="stat-description">Опубликовано</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon team-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>Команда</h3>
          <div class="stat-value">{{ stats.team }}</div>
          <div class="stat-description">Сотрудников</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon views-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
        <div class="stat-content">
          <h3>Просмотры</h3>
          <div class="stat-value">{{ stats.views }}</div>
          <div class="stat-description">За последние 30 дней</div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-grid">
      <div class="recent-activity panel">
        <div class="panel-header">
          <h2>Недавние изменения</h2>
          <button class="view-all-btn">Все изменения</button>
        </div>
        
        <div class="activity-list">
          <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
            <div class="activity-icon" :class="activity.type">
              <svg v-if="activity.type === 'add'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <svg v-else-if="activity.type === 'edit'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </div>
            <div class="activity-content">
              <div class="activity-message">{{ activity.message }}</div>
              <div class="activity-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quick-actions panel">
        <div class="panel-header">
          <h2>Быстрые действия</h2>
        </div>
        
        <div class="actions-grid">
          <router-link to="/admin/fighters/add" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div class="action-title">Добавить бойца</div>
          </router-link>
          
          <router-link to="/admin/news/add" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </div>
            <div class="action-title">Создать новость</div>
          </router-link>
          
          <router-link to="/admin/team/add" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </div>
            <div class="action-title">Добавить в команду</div>
          </router-link>
          
          <router-link to="/admin/settings" class="action-card">
            <div class="action-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <div class="action-title">Настройки</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Mock data for demonstration
const stats = ref({
  fighters: 15,
  news: 24,
  team: 8,
  views: 2548
});

const recentActivities = ref([
  {
    type: 'add',
    message: 'Добавлен новый боец: Александр Волков',
    time: '15 минут назад'
  },
  {
    type: 'edit',
    message: 'Обновлен профиль: Хабиб Нурмагомедов',
    time: '2 часа назад'
  },
  {
    type: 'add',
    message: 'Опубликована новость: "Предстоящий турнир в Москве"',
    time: '3 часа назад'
  },
  {
    type: 'edit',
    message: 'Обновлена информация о команде',
    time: 'Вчера, 15:30'
  },
  {
    type: 'delete',
    message: 'Удалена новость: "Отмененный турнир"',
    time: 'Вчера, 10:15'
  }
]);

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
</script>

<style scoped>
.admin-dashboard {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.page-header h1 {
  font-size: 1.8rem;
  margin: 0;
  color: var(--text-dark, #1e1e2d);
}

.last-updated {
  font-size: 0.85rem;
  color: var(--text-dark-muted, #4a5568);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.fighter-icon {
  background-color: #4F46E5;
}

.news-icon {
  background-color: #10B981;
}

.team-icon {
  background-color: #F59E0B;
}

.views-icon {
  background-color: #EC4899;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-dark-muted, #4a5568);
  font-weight: 500;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 4px 0;
  color: var(--text-dark, #1e1e2d);
}

.stat-description {
  font-size: 0.85rem;
  color: var(--text-dark-muted, #4a5568);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
}

.panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-dark, #1e1e2d);
}

.view-all-btn {
  background: none;
  border: none;
  color: var(--primary-color, #4F46E5);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.add {
  background-color: #10B981;
}

.activity-icon.edit {
  background-color: #F59E0B;
}

.activity-icon.delete {
  background-color: #EF4444;
}

.activity-content {
  flex: 1;
}

.activity-message {
  font-size: 0.9rem;
  margin-bottom: 4px;
  color: var(--text-dark, #1e1e2d);
}

.activity-time {
  font-size: 0.8rem;
  color: var(--text-dark-muted, #4a5568);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.action-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #121212;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-card:hover {
  background-color: var(--primary-color, #4F46E5);
  color: white;
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #121212;
}

.action-title {
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  color: #121212;
}

@media (max-width: 992px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 