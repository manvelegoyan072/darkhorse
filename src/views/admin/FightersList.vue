<template>
  <div class="fighters-management">
    <div class="page-header">
      <h1>Управление бойцами</h1>
      <BaseButton @click="$router.push('/admin/fighters/add')" icon="plus">
        Добавить бойца
      </BaseButton>
    </div>
    
    <div class="filters">
      <div class="search">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Поиск бойцов..."
          class="search-input"
        />
      </div>
      
      <div class="filter-group">
        <label for="weightClass">Весовая категория:</label>
        <select v-model="filters.weightClass" id="weightClass" class="filter-select">
          <option value="">Все</option>
          <option v-for="wc in weightClasses" :key="wc.value" :value="wc.value">
            {{ wc.label }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="nationality">Страна:</label>
        <select v-model="filters.nationality" id="nationality" class="filter-select">
          <option value="">Все</option>
          <option v-for="country in countries" :key="country.value" :value="country.value">
            {{ country.label }}
          </option>
        </select>
      </div>
      
      <BaseButton @click="resetFilters" type="secondary" class="reset-filters">
        Сбросить
      </BaseButton>
    </div>
    
    <div class="table-container">
      <table class="fighters-table">
        <thead>
          <tr>
            <th class="image-column">Фото</th>
            <th @click="sort('name')" class="sortable">
              Имя
              <span v-if="sortBy === 'name'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Весовая категория</th>
            <th @click="sort('record')" class="sortable">
              Рекорд
              <span v-if="sortBy === 'record'" class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th>Страна</th>
            <th>Статус</th>
            <th class="actions-column">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fighter in filteredFighters" :key="fighter.id" class="fighter-row">
            <td class="image-column">
              <img :src="fighter.image" :alt="fighter.name" class="fighter-thumbnail" />
            </td>
            <td>{{ fighter.name }}</td>
            <td>{{ fighter.weightClass }}</td>
            <td>{{ fighter.record }}</td>
            <td>
              <div class="nationality">
                <img 
                  v-if="countryFlags[fighter.nationality]" 
                  :src="countryFlags[fighter.nationality]" 
                  :alt="fighter.nationality" 
                  class="flag-icon"
                />
                {{ getCountryLabel(fighter.nationality) }}
              </div>
            </td>
            <td>
              <span class="status-badge" :class="getStatusClass(fighter.status)">
                {{ fighter.status || 'Активен' }}
              </span>
            </td>
            <td class="actions-column">
              <div class="action-buttons">
                <button @click="editFighter(fighter.id)" class="action-btn edit-btn" title="Редактировать">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button @click="deleteFighter(fighter.id)" class="action-btn delete-btn" title="Удалить">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredFighters.length === 0" class="empty-row">
            <td colspan="7">
              <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <p>Бойцы не найдены</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
          <p>Вы уверены, что хотите удалить этого бойца? Это действие нельзя отменить.</p>
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
import { fighters, countryFlags } from '../../data/fighters.js';

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 10;
const searchQuery = ref('');
const filters = ref({
  weightClass: '',
  nationality: ''
});
const sortBy = ref('name');
const sortDirection = ref('asc');
const showDeleteConfirm = ref(false);
const fighterToDelete = ref(null);

// Metadata
const weightClasses = [
  { value: 'flyweight', label: 'Наилегчайший вес' },
  { value: 'bantamweight', label: 'Легчайший вес' },
  { value: 'featherweight', label: 'Полулёгкий вес' },
  { value: 'lightweight', label: 'Лёгкий вес' },
  { value: 'welterweight', label: 'Полусредний вес' },
  { value: 'middleweight', label: 'Средний вес' },
  { value: 'light-heavyweight', label: 'Полутяжёлый вес' },
  { value: 'heavyweight', label: 'Тяжёлый вес' }
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

// Computed properties
const filteredFighters = computed(() => {
  let result = [...fighters];
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(fighter => 
      fighter.name.toLowerCase().includes(query) || 
      (fighter.nickname && fighter.nickname.toLowerCase().includes(query))
    );
  }
  
  // Apply category filters
  if (filters.value.weightClass) {
    result = result.filter(fighter => fighter.weightClass === filters.value.weightClass);
  }
  
  if (filters.value.nationality) {
    result = result.filter(fighter => fighter.nationality === filters.value.nationality);
  }
  
  // Apply sorting
  result.sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy.value === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (sortBy.value === 'record') {
      // Extract win count from record (e.g., "21-4-0" -> 21)
      valueA = parseInt(a.record.split('-')[0]) || 0;
      valueB = parseInt(b.record.split('-')[0]) || 0;
    } else {
      return 0;
    }
    
    if (sortDirection.value === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
  
  return result;
});

const paginatedFighters = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredFighters.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredFighters.value.length / itemsPerPage);
});

// Methods
function resetFilters() {
  searchQuery.value = '';
  filters.value = {
    weightClass: '',
    nationality: ''
  };
  currentPage.value = 1;
}

function sort(column) {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortDirection.value = 'asc';
  }
}

function getCountryLabel(code) {
  const country = countries.find(c => c.value === code);
  return country ? country.label : code;
}

function getStatusClass(status) {
  if (!status || status.toLowerCase() === 'активен') return 'active';
  if (status.toLowerCase() === 'неактивен') return 'inactive';
  if (status.toLowerCase() === 'травмирован') return 'injured';
  return '';
}

function editFighter(id) {
  router.push(`/admin/fighters/edit/${id}`);
}

function deleteFighter(id) {
  fighterToDelete.value = id;
  showDeleteConfirm.value = true;
}

function cancelDelete() {
  showDeleteConfirm.value = false;
  fighterToDelete.value = null;
}

function confirmDelete() {
  // Here you would make an API call to delete the fighter
  console.log(`Deleting fighter with ID: ${fighterToDelete.value}`);
  
  // For demo purposes, we're just hiding the modal
  showDeleteConfirm.value = false;
  fighterToDelete.value = null;
}
</script>

<style scoped>
.fighters-management {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-color, #1e1e2d);
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

.table-container {
  width: 100%;
  overflow-x: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.fighters-table {
  width: 100%;
  border-collapse: collapse;
}

.fighters-table th,
.fighters-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #edf2f7;
}

.fighters-table thead th {
  font-weight: 600;
  color: #4a5568;
  background-color: #f8fafc;
  position: sticky;
  top: 0;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  display: inline-block;
  margin-left: 6px;
}

.fighter-row:hover {
  background-color: #f8fafc;
}

.image-column {
  width: 70px;
}

.fighter-thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}

.nationality {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag-icon {
  width: 20px;
  height: 12px;
  border-radius: 2px;
  object-fit: cover;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.inactive {
  background-color: rgba(100, 116, 139, 0.1);
  color: #64748b;
}

.status-badge.injured {
  background-color: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.actions-column {
  width: 100px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: rgba(79, 70, 229, 0.1);
  color: #4F46E5;
}

.edit-btn:hover {
  background-color: #4F46E5;
  color: white;
}

.delete-btn {
  background-color: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

.delete-btn:hover {
  background-color: #EF4444;
  color: white;
}

.empty-row {
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  color: #94a3b8;
}

.empty-state svg {
  margin-bottom: 12px;
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
  
  .fighters-table th,
  .fighters-table td {
    padding: 8px 12px;
  }
  
  .actions-column {
    width: 80px;
  }
}
</style> 