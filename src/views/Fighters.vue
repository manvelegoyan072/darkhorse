<template>
  <main class="container">
    <section id="fighters" class="fighters-section">
      <h1>Бойцы Dark Horse</h1>

      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          id="search-input"
          class="search-input"
          placeholder="Поиск бойцов..."
          @keypress.enter="filterFighters"
        />
        <button id="search-button" class="search-button" @click="filterFighters">
          Найти
        </button>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label for="weight-class">Весовая категория:</label>
          <select v-model="weightClass" id="weight-class" @change="filterFighters">
            <option value="">Все категории</option>
            <option value="flyweight">Наилегчайший вес</option>
            <option value="bantamweight">Легчайший вес</option>
            <option value="featherweight">Полулёгкий вес</option>
            <option value="lightweight">Лёгкий вес</option>
            <option value="welterweight">Полусредний вес</option>
            <option value="middleweight">Средний вес</option>
            <option value="light-heavyweight">Полутяжёлый вес</option>
            <option value="heavyweight">Тяжёлый вес</option>
            <option value="super-heavyweight">Супертяжёлый вес</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="nationality">Национальность:</label>
          <select v-model="nationality" id="nationality" @change="filterFighters">
            <option value="">Все страны</option>
            <option value="russia">Россия</option>
            <option value="usa">США</option>
            <option value="brazil">Бразилия</option>
            <option value="ireland">Ирландия</option>
            <option value="nigeria">Нигерия</option>
            <option value="tajikistan">Таджикистан</option>
            <option value="kyrgyzstan">Киргизия</option>
            <option value="kazakhstan">Казахстан</option>
          </select>
        </div>
        <div class="filter-group">
          <label for="organization">Организация:</label>
          <select v-model="organization" id="organization" @change="filterFighters">
            <option value="">Все организации</option>
            <option value="ufc">UFC</option>
            <option value="bellator">Bellator</option>
            <option value="one">ONE Championship</option>
            <option value="pfl">PFL</option>
          </select>
        </div>
      </div>

      <div class="fighters-grid">
        <div
          v-for="fighter in filteredFighters"
          :key="fighter.name"
          class="fighter-card"
        >
          <img :src="fighter.image" :alt="fighter.name" class="fighter-image" />
          <div class="fighter-info">
            <h3 class="fighter-name">{{ fighter.name }}</h3>
            <p class="fighter-nickname">{{ fighter.nickname || '' }}</p>
            <p class="fighter-stats">
              <img
                v-if="countryFlags[fighter.nationality]"
                :src="countryFlags[fighter.nationality]"
                :alt="`${fighter.nationality} flag`"
              />
              {{ fighter.weightClass }} | {{ fighter.record }}
            </p>
            <router-link
              :to="`/fighters/${fighter.url.split('/').pop()}`"
              class="fighter-link"
            >
              Подробнее
            </router-link>
          </div>
        </div>
        <p v-if="!filteredFighters.length">Бойцы не найдены</p>
      </div>
    </section>
  </main>
</template>

<script>
import { fighters, countryFlags } from '../data/fighters.js';

export default {
  name: 'Fighters',
  data() {
    return {
      searchQuery: '',
      weightClass: '',
      nationality: '',
      organization: '',
      fighters: fighters,
      countryFlags: countryFlags,
    };
  },
  computed: {
    filteredFighters() {
      return this.fighters.filter(fighter => {
        const matchesSearch = fighter.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesWeight = !this.weightClass || fighter.weightClass === this.weightClass;
        const matchesNationality =
          !this.nationality || fighter.nationality === this.nationality;
        // Пока не фильтруем по организации, так как в данных бойцов нет этого поля
        return matchesSearch && matchesWeight && matchesNationality;
      });
    },
  },
  methods: {
    filterFighters() {
      // Фильтрация уже обрабатывается через computed свойство
    },
  },
};
</script>

<style scoped>
.fighters-section {
  margin-top: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.filter-group select,
.search-input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
}

.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  margin-top: 2cm;
}

.search-input {
  flex-grow: 1;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.fighters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.fighter-card {
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  border: 2px solid #333;
  position: relative;
}

.fighter-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  border-bottom: 2px solid #333;
}

.fighter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.fighter-info {
  background: linear-gradient(180deg, #262626 0%, #1c1c1c 100%);
  border-top: 2px solid #333;
  padding: 1.5rem;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
}

.fighter-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  min-height: 1.2em;
}

.fighter-nickname {
  font-size: 1rem;
  font-style: italic;
  color: var(--text-color);
  margin: 5px 0;
  line-height: 1.2;
  min-height: 1.2em;
}

.fighter-stats {
  font-size: 0.9rem;
  color: #9f9f9f;
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  margin: 0;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  bottom: 80px;
  left: 1.5rem;
  right: 1.5rem;
}

.fighter-stats img {
  width: 25px;
  height: 16.6px;
  vertical-align: middle;
  margin-right: 5px;
}

.fighter-link {
  position: absolute;
  bottom: 20px;
  left: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(145deg, #404040 0%, #333333 100%);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  text-align: center;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border: 1px solid #505050;
}

.fighter-link:hover {
  background: linear-gradient(145deg, #505050 0%, #404040 100%);
}

.fighter-link::before,
.fighter-link::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: linear-gradient(145deg, #666 0%, #444 100%);
  border-radius: 50%;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3);
  border: 1px solid #555;
}

.fighter-link::before {
  left: -20px;
}

.fighter-link::after {
  right: -20px;
}

.fighter-link:hover::before,
.fighter-link::after:hover {
  background: var(--secondary-color);
}

@media (max-width: 768px) {
  .fighters-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .fighter-card {
    margin: 0 auto;
    max-width: 300px;
  }

  .fighter-card img {
    height: 250px;
  }

  .fighter-info {
    min-height: 140px;
    padding: 1rem;
  }

  .fighter-stats {
    bottom: 70px;
    left: 1rem;
    right: 1rem;
  }

  .fighter-link {
    bottom: 15px;
    left: 1rem;
    right: 1rem;
  }

  .search-container {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1cm;
  }

  .filters {
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-group {
    min-width: 100%;
  }

  .filter-group select,
  .search-input,
  .search-button {
    width: 100%;
    margin: 0;
  }

  .container {
    padding: 0 10px;
  }
}
</style>