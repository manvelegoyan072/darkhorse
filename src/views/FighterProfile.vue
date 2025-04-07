<template>
  <main class="container">
    <div class="fighter-profile" v-if="fighter">
      <div class="profile-header">
        <div class="profile-image">
          <img :src="fighter.image" :alt="fighter.name" />
        </div>
        <div class="profile-info">
          <h1 class="fighter-name">
            <img
              v-if="flagSrc"
              :src="flagSrc"
              :alt="`${fighter.nationality} flag`"
              class="flag-icon"
            />
            {{ fighter.name }}
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
        <h2>История боёв</h2>
        <table class="fight-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Соперник</th>
              <th>Результат</th>
              <th>Метод</th>
              <th>Раунд</th>
              <th>Время</th>
              <th>Событие</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fight in fighter.fightHistory" :key="fight.date + fight.opponent">
              <td>{{ fight.date }}</td>
              <td>{{ fight.opponent }}</td>
              <td>
                <span :class="['result', fight.result.toLowerCase()]">{{ fight.result }}</span>
              </td>
              <td>{{ fight.method }}</td>
              <td>{{ fight.round }}</td>
              <td>{{ fight.time }}</td>
              <td>{{ fight.event }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="biography-section">
        <h2>Биография</h2>
        <p v-for="(paragraph, index) in fighter.biography" :key="index">{{ paragraph }}</p>
      </div>
    </div>
    <div v-else>
      <p>Боец не найден</p>
    </div>
  </main>
</template>

<script>
import { fighters, countryFlags } from '../data/fighters.js';

export default {
  name: 'FighterProfile',
  computed: {
    fighter() {
      return fighters.find(f => f.url.split('/').pop() === this.$route.params.id) || null;
    },
    flagSrc() {
      if (!this.fighter || !this.fighter.nationality) return null;
      const nationality = this.fighter.nationality.toLowerCase();
      return countryFlags[nationality] || null;
    },
    filteredDetails() {
      if (!this.fighter || !this.fighter.details) return {};
      const { Команда, ...rest } = this.fighter.details;
      return rest;
    },
  },
};
</script>

<style scoped>
.fighter-profile {
  margin-top: 60px; /* Увеличен отступ сверху до 60px, чтобы учесть высоту хедера */
  padding-top: 20px; /* Добавлен дополнительный внутренний отступ 2 см */
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

.fighter-name {
  font-size: 2.5em;
  margin: 0 0 10px; /* Убрал большой верхний отступ, так как он теперь в .fighter-profile */
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

.fight-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.fight-table th,
.fight-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--accent-color);
}

.fight-table th {
  background: var(--secondary-color);
  font-weight: bold;
}

.fight-table tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

.result {
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
}

.win {
  color: #4caf50;
}

.loss {
  color: #f44336;
}

.draw {
  color: #ffc107;
}

.biography-section {
  margin: 40px 0;
  padding: 20px;
  background: var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.biography-section p {
  margin-bottom: 15px;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
  }

  .profile-image {
    width: 100%;
    max-width: 400px;
  }

  .fighter-name {
    font-size: 2em;
  }

  .flag-icon {
    width: 32px;
    height: 20px;
  }

  .fighter-nickname {
    font-size: 1.2em;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fight-table {
    font-size: 0.9em;
  }
}
</style>