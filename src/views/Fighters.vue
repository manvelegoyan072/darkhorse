<template>
  <main class="container">
    <section id="fighters" class="fighters-section">
      <div class="section-title">
        <h2>Бойцы Dark Horse</h2>
        <p>Профессиональные бойцы, представляющие наше агентство в лучших промоушенах мира</p>
      </div>

      <!-- Mobile search bar -->
      <div class="mobile-search-container">
        <input
          v-model="searchQuery"
          type="text"
          class="mobile-search-input"
          placeholder="Поиск бойцов..."
          @input="debouncedFilter"
        />
        <button 
          class="mobile-search-button" 
          @click="filterFighters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <!-- Mobile filter toggle -->
      <button 
        class="filter-toggle-btn" 
        @click="showMobileFilters = !showMobileFilters"
        :class="{ 'active': showMobileFilters }"
      >
        <span class="filter-icon"></span>
        Фильтры
        <span class="filter-count" v-if="activeFiltersCount">{{ activeFiltersCount }}</span>
      </button>

      <!-- Search and Filters -->
      <div class="search-filters-container" :class="{ 'mobile-visible': showMobileFilters }">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            id="search-input"
            class="search-input"
            placeholder="Поиск бойцов..."
            @input="debouncedFilter"
          />
          <button 
            id="search-button" 
            class="search-button" 
            @click="filterFighters"
          >
            Найти
          </button>
        </div>

        <div class="filters-header">
          <h3 class="filters-heading">Фильтры</h3>
          <button class="close-filters-btn" @click="showMobileFilters = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Закрыть</span>
        </button>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label for="weight-class">Весовая категория:</label>
              <div class="select-wrapper">
                <select v-model="filters.weightClass" id="weight-class" @change="filterFighters">
            <option value="">Все категории</option>
                  <option v-for="weightClass in weightClasses" :key="weightClass.value" :value="weightClass.value">
                    {{ weightClass.label }}
                  </option>
          </select>
              </div>
        </div>
        <div class="filter-group">
          <label for="nationality">Национальность:</label>
              <div class="select-wrapper">
                <select v-model="filters.nationality" id="nationality" @change="filterFighters">
            <option value="">Все страны</option>
                  <option v-for="country in countries" :key="country.value" :value="country.value">
                    {{ country.label }}
                  </option>
          </select>
              </div>
        </div>
        <div class="filter-group">
          <label for="organization">Организация:</label>
              <div class="select-wrapper">
                <select v-model="filters.organization" id="organization" @change="filterFighters">
            <option value="">Все организации</option>
                  <option v-for="org in organizations" :key="org.value" :value="org.value">
                    {{ org.label }}
                  </option>
          </select>
              </div>
          </div>
        </div>

        <div class="filter-actions">
          <button @click="resetFilters" class="reset-filters-btn">
            Сбросить фильтры
          </button>
          <button @click="applyFilters" class="apply-filters-btn">
            Применить
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="loading" class="loading-indicator">
        <div class="loading-spinner"></div>
        <p>Загрузка бойцов...</p>
      </div>
      
      <div v-else>
        <!-- Results count -->
        <div class="results-count">
          Найдено бойцов: <strong>{{ filteredFighters.length }}</strong>
          <span v-if="activeFiltersCount" class="filters-applied">
            (применены фильтры: {{ activeFiltersCount }})
          </span>
      </div>

      <div class="fighters-grid">
        <div
          v-for="fighter in filteredFighters"
              :key="fighter.id || fighter.name"
          class="fighter-card"
        >
              <div class="fighter-image-wrapper">
                <div class="fighter-nationality" v-if="countryFlags[fighter.nationality]">
                  <img
                :src="countryFlags[fighter.nationality]"
                :alt="`${fighter.nationality} flag`"
              />
                </div>
                <img 
                  :src="fighter.image" 
                  :alt="fighter.name" 
                  class="fighter-image" 
                  @error="handleImageError" 
                  loading="lazy"
                />
                <div class="fighter-weight-class">{{ fighter.weightClass }}</div>
              </div>
              
              <div class="fighter-info">
                <h3 class="fighter-name">{{ fighter.name }}</h3>
                <div class="fighter-nickname-container">
                  <p class="fighter-nickname" v-if="fighter.nickname">
                    {{ fighter.nickname }}
                  </p>
                  <div v-else class="fighter-nickname-placeholder"></div>
                </div>
                <div class="fighter-record">
                  <div class="record-item">
                    <span class="record-value">{{ getRecordNumber(fighter.record, 'W') }}</span>
                    <span class="record-label">Побед</span>
                  </div>
                  <div class="record-item">
                    <span class="record-value">{{ getRecordNumber(fighter.record, 'L') }}</span>
                    <span class="record-label">Поражений</span>
                  </div>
                  <div class="record-item">
                    <span class="record-value">{{ getRecordNumber(fighter.record, 'D') }}</span>
                    <span class="record-label">Ничьих</span>
                  </div>
                </div>
            <router-link
                  :to="`/fighters/${fighter.url ? fighter.url.split('/').pop() : fighter.id}`"
              class="fighter-link"
            >
              Подробнее
            </router-link>
          </div>
        </div>
        </div>
          
        <div v-if="!filteredFighters.length && !loading" class="no-results">
          <div class="no-results-icon">?</div>
          <h3>Бойцы не найдены</h3>
          <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
          <button @click="resetFilters" class="reset-filters-btn">
            Сбросить фильтры
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { fighters, countryFlags } from '../data/fighters.js';

// State
const searchQuery = ref('');
const filters = ref({
  weightClass: '',
  nationality: '',
  organization: ''
});
const loading = ref(true);
const showMobileFilters = ref(false);
let searchTimeout = null;

// Constants and metadata
const weightClasses = [
  { value: 'flyweight', label: 'Наилегчайший вес' },
  { value: 'bantamweight', label: 'Легчайший вес' },
  { value: 'featherweight', label: 'Полулёгкий вес' },
  { value: 'lightweight', label: 'Лёгкий вес' },
  { value: 'welterweight', label: 'Полусредний вес' },
  { value: 'middleweight', label: 'Средний вес' },
  { value: 'light-heavyweight', label: 'Полутяжёлый вес' },
  { value: 'heavyweight', label: 'Тяжёлый вес' },
  { value: 'super-heavyweight', label: 'Супертяжёлый вес' }
];

const countries = [
  { value: 'russia', label: 'Россия' },
  { value: 'usa', label: 'США' },
  { value: 'brazil', label: 'Бразилия' },
  { value: 'ireland', label: 'Ирландия' },
  { value: 'nigeria', label: 'Нигерия' },
  { value: 'tajikistan', label: 'Таджикистан' },
  { value: 'kyrgyzstan', label: 'Киргизия' },
  { value: 'kazakhstan', label: 'Казахстан' }
];

const organizations = [
  { value: 'ufc', label: 'UFC' },
  { value: 'bellator', label: 'Bellator' },
  { value: 'one', label: 'ONE Championship' },
  { value: 'pfl', label: 'PFL' }
];

// Computed
const filteredFighters = computed(() => {
  return fighters.filter(fighter => {
    const matchesSearch = searchQuery.value
      ? fighter.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true;
    
    const matchesWeight = filters.value.weightClass
      ? fighter.weightClass === filters.value.weightClass
      : true;
    
    const matchesNationality = filters.value.nationality
      ? fighter.nationality === filters.value.nationality
      : true;
    
    const matchesOrganization = filters.value.organization
      ? (fighter.organization === filters.value.organization)
      : true;
    
    return matchesSearch && matchesWeight && matchesNationality && matchesOrganization;
  });
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (searchQuery.value) count++;
  if (filters.value.weightClass) count++;
  if (filters.value.nationality) count++;
  if (filters.value.organization) count++;
  return count;
});

// Methods
const filterFighters = () => {
  // The filtering is handled reactively through the computed property
  if (window.innerWidth <= 768) {
    showMobileFilters.value = false;
  }
};

// Debounce search to avoid excessive filtering on every keystroke
const debouncedFilter = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    filterFighters();
  }, 300);
};

const resetFilters = () => {
  searchQuery.value = '';
  filters.value = {
      weightClass: '',
      nationality: '',
    organization: ''
  };
};

const applyFilters = () => {
  filterFighters();
};

const handleImageError = (event) => {
  event.target.src = '/placeholder-fighter.jpg'; // Fallback image
};

// Extract win/loss/draw count from record string (e.g., "21-10-3")
const getRecordNumber = (record, type) => {
  if (!record) return 0;
  
  const parts = record.split('-');
  switch (type) {
    case 'W': return parts[0] || 0;
    case 'L': return parts[1] || 0;
    case 'D': return parts[2] || 0;
    default: return 0;
  }
};

// Close mobile filters when clicking outside
const handleClickOutside = (event) => {
  const filtersContainer = document.querySelector('.search-filters-container');
  const filterToggle = document.querySelector('.filter-toggle-btn');
  
  if (
    showMobileFilters.value && 
    filtersContainer && 
    !filtersContainer.contains(event.target) &&
    filterToggle &&
    !filterToggle.contains(event.target)
  ) {
    showMobileFilters.value = false;
  }
};

// Update body scroll for mobile
const updateBodyScroll = () => {
  if (window.innerWidth <= 768) {
    document.body.style.overflow = showMobileFilters.value ? 'hidden' : '';
  }
};

// Watch for filter panel state changes
watch(showMobileFilters, () => {
  updateBodyScroll();
});

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // Simulate loading data
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.fighters-section {
  padding: 80px 0;
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

/* Mobile search bar */
.mobile-search-container {
  display: none;
  margin-bottom: 15px;
  position: relative;
}

.mobile-search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.mobile-search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.2);
}

.mobile-search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--accent-color);
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile filter toggle */
.filter-toggle-btn {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background: var(--bg-color);
  border: 1px solid var(--accent-color);
  border-radius: 8px;
  color: var(--text-color);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-toggle-btn.active {
  background: var(--accent-color);
  color: var(--bg-color);
}

.filter-icon {
  display: inline-block;
  width: 18px;
  height: 14px;
  position: relative;
}

.filter-icon:before,
.filter-icon:after {
  content: '';
  position: absolute;
  width: 18px;
  height: 2px;
  background: currentColor;
  left: 0;
}

.filter-icon:before {
  top: 3px;
  width: 70%;
}

.filter-icon:after {
  bottom: 3px;
  width: 40%;
}

.filter-count {
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

/* Search & Filters Container */
.search-filters-container {
  background: var(--bg-color);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* Filters Header and Close Button */
.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.filters-heading {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--accent-color);
  margin: 0;
}

.close-filters-btn {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  background: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-filters-btn:hover {
  background: var(--primary-color);
  color: var(--secondary-color);
}

.close-filters-btn svg {
  width: 16px;
  height: 16px;
}

/* Search */
.search-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  padding: 12px 15px;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.2);
}

.search-button {
  padding: 0 20px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
  font-weight: 600;
}

.search-button:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  transform: translateY(-2px);
}

/* Filters */
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-weight: 600;
  color: var(--text-color);
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: '';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--accent-color);
  pointer-events: none;
}

.filter-group select {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  font-size: 1rem;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.2);
}

/* Filter Actions */
.filter-actions {
  display: none;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
}

.reset-filters-btn {
  padding: 10px 15px;
  background: transparent;
  border: 1px solid var(--accent-color);
  color: var(--text-color);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.apply-filters-btn {
  padding: 10px 15px;
  background: var(--accent-color);
  border: none;
  color: var(--primary-color);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-filters-btn:hover {
  background: var(--primary-color);
  color: var(--secondary-color);
}

/* Results Count */
.results-count {
  margin-bottom: 20px;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.filters-applied {
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Fighters Grid */
.fighters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Fighter Card */
.fighter-card {
  background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fighter-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.fighter-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.fighter-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;
}

.fighter-card:hover .fighter-image {
  transform: scale(1.05);
}

.fighter-nationality {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1;
}

.fighter-nationality img {
  width: 35px;
  height: 23px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.fighter-weight-class {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%);
  color: white;
  font-size: 0.85rem;
  text-align: center;
}

.fighter-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.fighter-name {
  font-size: 1.4rem;
  margin: 0 0 5px;
  color: #ffffff;
  line-height: 1.2;
  height: 1.7rem; /* Фиксированная высота для выравнивания */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.fighter-nickname-container {
  height: 36px; /* Фиксированная высота для выравнивания */
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.fighter-nickname {
  font-style: italic;
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.3;
}

.fighter-nickname-placeholder {
  height: 1.2rem;
}

.fighter-record {
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
}

.record-item {
  display: flex;
  flex-direction: column;
}

.record-value {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--accent-color);
}

.record-label {
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 3px;
}

.fighter-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: var(--accent-color);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 8px;
  margin-top: auto;
  font-weight: 600;
  transition: all 0.3s ease;
}

.fighter-link:hover {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

/* Loading and No Results States */
.loading-indicator,
.no-results {
  text-align: center;
  padding: 50px 20px;
  margin: 30px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--accent-color);
  animation: spin 1s ease-in-out infinite;
}

.no-results-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--accent-color);
}

.no-results h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.no-results p {
  margin-bottom: 20px;
  color: #aaa;
}

.no-results .reset-filters-btn {
  display: inline-block;
  padding: 10px 20px;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mobile Responsive Adjustments */
@media (max-width: 992px) {
  .fighters-section {
    padding: 60px 0;
  }
  
  .section-title h2 {
    font-size: 2rem;
  }
  
  .section-title p {
    font-size: 1rem;
  }
  
  .fighters-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .fighter-info {
    padding: 15px;
  }
  
  .fighter-name {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .fighters-section {
    padding: 40px 0;
  }
  
  .mobile-search-container {
    display: block;
  }
  
  .search-filters-container .search-container {
    display: none; /* Скрываем поисковую строку внутри фильтров в мобильной версии */
  }
  
  .filter-toggle-btn {
    display: flex;
  }
  
  .search-filters-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    margin-bottom: 0;
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .search-filters-container.mobile-visible {
    transform: translateY(0);
  }
  
  .filters-header {
    position: sticky;
    top: 0;
    background: var(--bg-color);
    z-index: 5;
    padding: 15px 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-filters-btn {
    display: flex;
    align-items: center;
  }
  
  .filters-heading {
    display: block;
    font-size: 1.3rem;
    margin: 0;
    color: var(--accent-color);
  }

  .filters {
    grid-template-columns: 1fr;
    margin-bottom: 20px;
  }
  
  .filter-actions {
    display: grid;
    margin-top: auto;
    padding-top: 20px;
  }
  
  .fighters-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
  }
  
  .fighter-record {
    padding: 10px;
  }
  
  .record-value {
    font-size: 1.1rem;
  }

  .section-title h2 {
    font-size: 2em;
  }

  .section-title p {
    font-size: 1em;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .fighters-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .fighter-image-wrapper {
    aspect-ratio: 16 / 9;
  }
}
</style>