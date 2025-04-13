<template>
  <main class="container">
    <div class="fighter-profile">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading fighter profile...</p>
      </div>

      <div v-else-if="error" class="error-container">
        <h2>Could not load fighter profile</h2>
        <p>{{ error }}</p>
        <BaseButton @click="$router.push('/fighters')">Return to Fighters</BaseButton>
      </div>

      <template v-else-if="fighter">
      <div class="profile-header">
        <div class="profile-image">
          <img :src="fighter.image" :alt="fighter.name" />
        </div>
        <div class="profile-info">
            <div class="flag-container">
              <img
                v-if="flagSrc"
                :src="flagSrc"
                :alt="`${fighter.nationality} flag`"
                class="flag-icon mobile-flag"
              />
            </div>
          <h1 class="fighter-name">
              {{ fighter.name }}
            <img
              v-if="flagSrc"
              :src="flagSrc"
              :alt="`${fighter.nationality} flag`"
                class="flag-icon desktop-flag"
            />
          </h1>
          <h2 class="fighter-nickname">"{{ fighter.nickname || 'Нет' }}"</h2>
          <div class="fighter-details">
            <div
              class="detail-item"
              v-for="(value, key) in filteredDetails"
              :key="key"
            >
              <div class="detail-label">{{ key }}</div>
              <div class="detail-value">{{ value }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-section">
        <h2>Статистика</h2>
        <div class="stats-grid">
          <div class="stat-card" v-for="(stat, label) in fighter.stats" :key="label">
            <div class="stat-value">{{ stat }}</div>
            <div class="stat-label">{{ label }}</div>
          </div>
        </div>
      </div>

      <div class="fight-history">
          <h2>История боев</h2>
          <div class="table-container">
            <table class="fight-history-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Соперник</th>
                  <th>Итог</th>
                  <th>Детали</th>
            </tr>
          </thead>
          <tbody>
                <template v-for="(fight, index) in fightHistory" :key="index">
                  <tr>
                    <td>{{ formatDate(fight.date) }}</td>
              <td>{{ fight.opponent }}</td>
              <td>
                      <span :class="['result', getResultClass(fight.result)]">
                        <span v-if="fight.result.toLowerCase().includes('победа') || fight.result.toLowerCase().includes('win')" class="win-icon">W</span>
                        <span v-else-if="fight.result.toLowerCase().includes('поражение') || fight.result.toLowerCase().includes('loss')" class="loss-icon">L</span>
                        <span v-else class="draw-icon">D</span>
                      </span>
                    </td>
                    <td class="details-column">
                      <button 
                        class="details-toggle" 
                        @click="toggleFightDetails(index)"
                        :aria-expanded="expandedFights.includes(index)"
                        :aria-label="expandedFights.includes(index) ? 'Скрыть детали' : 'Показать детали'"
                      >
                        {{ expandedFights.includes(index) ? 'Скрыть' : 'Детали' }}
                      </button>
                    </td>
                  </tr>
                  <tr v-show="expandedFights.includes(index)" class="details-row">
                    <td colspan="4">
                      <div class="fight-details">
                        <div class="detail-grid">
                          <div class="detail-item">
                            <span class="detail-label">Метод:</span>
                            <span class="detail-value">{{ fight.method }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Раунд:</span>
                            <span class="detail-value">{{ fight.round }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Время:</span>
                            <span class="detail-value">{{ fight.time }}</span>
                          </div>
                          <div class="detail-item">
                            <span class="detail-label">Событие:</span>
                            <span class="detail-value">{{ fight.event }}</span>
                          </div>
                        </div>
                      </div>
              </td>
            </tr>
                </template>
          </tbody>
        </table>
          </div>
      </div>

      <div class="biography-section">
        <h2>Биография</h2>
        <p v-for="(paragraph, index) in fighter.biography" :key="index">{{ paragraph }}</p>
      </div>
      </template>
      <div v-else class="not-found">
        <h2>Боец не найден</h2>
        <router-link to="/fighters" class="back-link">Вернуться к списку бойцов</router-link>
    </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fighters, countryFlags } from '../data/fighters.js';

const route = useRoute();
const expandedFights = ref([]);
const loading = ref(true);
const error = ref(null);

// Computed properties
const fighter = computed(() => {
  return fighters.find(f => f.url.split('/').pop() === route.params.id) || null;
});

const flagSrc = computed(() => {
  if (!fighter.value || !fighter.value.nationality) return null;
  const nationality = fighter.value.nationality.toLowerCase();
      return countryFlags[nationality] || null;
});

const filteredDetails = computed(() => {
  if (!fighter.value || !fighter.value.details) return {};
  const { Команда, ...rest } = fighter.value.details;
      return rest;
});

// Получаем историю боев
const fightHistory = computed(() => {
  return fighter.value && fighter.value.fightHistory ? fighter.value.fightHistory : [];
});

// Methods
const getResultClass = (result) => {
  if (result.toLowerCase().includes('победа') || result.toLowerCase().includes('win')) return 'win';
  if (result.toLowerCase().includes('поражение') || result.toLowerCase().includes('loss')) return 'loss';
  return 'draw';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Если дата содержит дефисы (формат YYYY-MM-DD), преобразуем её
  if (dateString.includes('-')) {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ru-RU', options);
    } catch (e) {
      console.error('Ошибка форматирования даты:', e);
      return dateString;
    }
  }
  
  // Если дата уже в правильном формате (например, "15 июня 2023"), возвращаем как есть
  return dateString;
};

const toggleFightDetails = (index) => {
  if (expandedFights.value.includes(index)) {
    expandedFights.value = expandedFights.value.filter(i => i !== index);
  } else {
    expandedFights.value.push(index);
  }
};

// Lifecycle hooks
onMounted(() => {
  // Simulate fetching fighter data
  loading.value = true;
  setTimeout(() => {
    if (fighter.value) {
      loading.value = false;
    } else {
      error.value = "Fighter not found";
      loading.value = false;
    }
  }, 500);
});
</script>

<style scoped>
.fighter-profile {
  margin-top: 60px; /* Увеличен отступ сверху до 60px, чтобы учесть высоту хедера */
  padding-top: 20px; /* Добавлен дополнительный внутренний отступ 2 см */
  min-height: calc(100vh - 140px); /* Ensure content takes up at least the viewport minus header and some space for footer */
  display: flex;
  flex-direction: column;
}

.profile-header {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
  align-items: flex-end;
}

.profile-image {
  flex: 0 0 400px;
  display: flex;
  align-items: flex-end;
}

.profile-image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.profile-info {
  flex: 1;
}

.flag-container {
  display: none;
}

.fighter-name {
  font-size: 2.5em;
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.flag-icon {
  width: 40px;
  height: 24px;
  object-fit: cover;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.desktop-flag {
  display: inline-block;
}

.mobile-flag {
  display: none;
}

.fighter-nickname {
  font-size: 1.5em;
  color: #888;
  margin: 0 0 20px;
}

.fighter-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.detail-item {
  background: var(--secondary-color);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-label {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 1.2em;
  font-weight: bold;
}

.stats-section {
  margin-top: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: var(--secondary-color);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  color: #888;
  font-size: 0.9em;
}

.fight-history {
  margin-top: 40px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.fight-history-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.fight-history-table th,
.fight-history-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.fight-history-table th {
  background: var(--secondary-color);
  font-weight: bold;
  position: sticky;
  top: 0;
}

.details-column {
  width: 100px;
  text-align: center;
}

.details-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 6px 12px;
  background-color: var(--accent-color);
  color: var(--bg-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9em;
  transition: all 0.2s ease;
}

.details-toggle:hover {
  background-color: var(--primary-color);
  transform: translateY(-2px);
}

.details-row {
  background: rgba(255, 255, 255, 0.03);
}

.fight-details {
  padding: 15px;
  animation: fadeIn 0.3s ease;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.fight-details .detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 6px;
}

.fight-details .detail-label {
  font-size: 0.85em;
  color: #aaa;
  margin-bottom: 0;
}

.result {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.win-icon, .loss-icon, .draw-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
}

.win-icon {
  background-color: #4caf50;
}

.loss-icon {
  background-color: #f44336;
}

.draw-icon {
  background-color: #ff9800;
}

.win {
  color: #4caf50;
}

.loss {
  color: #f44336;
}

.draw {
  color: #ff9800;
}

.not-found {
  margin-top: 60px;
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--bg-color);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.back-link:hover {
  background-color: var(--primary-color);
  transform: translateY(-2px);
}

.biography-section {
  margin: 40px 0 80px;
  padding: 20px;
  background: var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.biography-section p {
  margin-bottom: 15px;
  line-height: 1.8;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 300px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color, #1976d2);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container h2 {
  color: #f44336;
  margin-bottom: 1rem;
}

.error-container button {
  margin-top: 1rem;
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-image {
    width: 100%;
    max-width: 400px;
  }

  .flag-container {
    display: block;
    margin-bottom: 10px;
  }

  .fighter-name {
    font-size: 2em;
    justify-content: center;
  }

  .desktop-flag {
    display: none;
  }

  .mobile-flag {
    display: inline-block;
  }

  .fighter-nickname {
    font-size: 1.2em;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fight-history-table {
    font-size: 0.9em;
    width: 100%;
  }
  
  .details-toggle {
    padding: 8px;
    width: 100%;
    font-size: 0.85em;
  }
  
  .details-column {
    width: 70px;
  }
  
  .fight-history-table th,
  .fight-history-table td {
    padding: 8px 5px;
  }
  
  /* Компактное отображение таблицы на мобильном */
  .fight-history-table th:first-child,
  .fight-history-table td:first-child {
    width: 25%;
    max-width: 80px;
  }
  
  .fight-history-table th:nth-child(2),
  .fight-history-table td:nth-child(2) {
    width: 35%;
  }
  
  .fight-history-table th:nth-child(3),
  .fight-history-table td:nth-child(3) {
    width: 20%;
    text-align: center;
  }
  
  .fight-history-table th:nth-child(4),
  .fight-history-table td:nth-child(4) {
    width: 20%;
    text-align: center;
  }
  
  .win-icon, .loss-icon, .draw-icon {
    width: 20px;
    height: 20px;
    font-size: 0.85em;
  }

  .biography-section {
    margin-bottom: 100px; /* Increased bottom margin on mobile devices */
  }

  .container {
    margin-bottom: 100px; /* Increased bottom margin on mobile devices */
  }
}

@media (max-width: 480px) {
  .details-row td {
    padding: 5px;
  }
  
  .fight-details {
    padding: 10px 5px;
  }
  
  .fight-details .detail-item {
    padding: 10px;
  }
  
  .fight-history-table {
    font-size: 0.8rem;
    min-width: 100%; /* Убираем минимальную ширину, чтобы предотвратить скролл */
  }
  
  .fight-history-table th,
  .fight-history-table td {
    padding: 6px 3px;
  }
  
  .details-toggle {
    padding: 6px 8px;
    font-size: 0.8em;
  }
  
  /* Очень компактное отображение для самых маленьких экранов */
  .result {
    padding: 3px;
    gap: 3px;
  }
  
  .win-icon, .loss-icon, .draw-icon {
    width: 18px;
    height: 18px;
    font-size: 0.8em;
  }
}

/* Adding margin to the container to ensure spacing with footer */
.container {
  margin-bottom: 80px;
}
</style>