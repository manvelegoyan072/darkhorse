<template>
  <div class="team-management">
    <div class="page-header">
      <h1>Управление командой</h1>
      <BaseButton type="primary" @click="$router.push('/admin/team/add')">
        <span class="icon-plus">+</span> Добавить члена команды
      </BaseButton>
    </div>
    
    <div class="filters">
      <div class="search-box">
        <input
          type="text"
          v-model="search"
          placeholder="Поиск по имени или должности..."
          class="search-input"
        />
        <button @click="search = ''" v-if="search" class="clear-search">
          ✕
        </button>
      </div>
      
      <div class="filter-group">
        <label for="role-filter">Роль:</label>
        <select id="role-filter" v-model="roleFilter" class="filter-select">
          <option value="">Все роли</option>
          <option value="coach">Тренер</option>
          <option value="fighter">Боец</option>
          <option value="management">Руководство</option>
          <option value="staff">Персонал</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="status-filter">Статус:</label>
        <select id="status-filter" v-model="statusFilter" class="filter-select">
          <option value="">Все статусы</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>
    </div>
    
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
    
    <div v-else-if="filteredTeamMembers.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <h3>Участники команды не найдены</h3>
      <p v-if="hasFilters">Попробуйте изменить параметры поиска или сбросить фильтры.</p>
      <p v-else>Начните добавлять участников команды, чтобы они отобразились здесь.</p>
      <BaseButton v-if="hasFilters" @click="clearFilters" type="secondary">
        Сбросить фильтры
      </BaseButton>
    </div>
    
    <div v-else class="team-list">
      <div class="team-card" v-for="member in filteredTeamMembers" :key="member.id">
        <div class="member-photo">
          <img :src="member.photo" :alt="member.name" />
        </div>
        
        <div class="member-info">
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-role">{{ getRoleLabel(member.role) }}</p>
          <p class="member-bio">{{ truncateBio(member.bio) }}</p>
          
          <div class="member-status" :class="member.status">
            {{ member.status === 'active' ? 'Активный' : 'Неактивный' }}
          </div>
        </div>
        
        <div class="member-actions">
          <button @click="$router.push(`/admin/team/edit/${member.id}`)" class="action-btn edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          
          <button @click="openDeleteModal(member)" class="action-btn delete">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Подтверждение удаления</h3>
          <button @click="showDeleteModal = false" class="close-btn">✕</button>
        </div>
        
        <div class="modal-body">
          <p>Вы уверены, что хотите удалить члена команды <strong>{{ memberToDelete?.name }}</strong>?</p>
          <p class="warning">Это действие нельзя будет отменить.</p>
        </div>
        
        <div class="modal-footer">
          <BaseButton @click="showDeleteModal = false" type="secondary">
            Отмена
          </BaseButton>
          <BaseButton @click="deleteTeamMember" type="primary" color-variant="danger">
            {{ isDeleting ? 'Удаление...' : 'Удалить' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State
const teamMembers = ref([]);
const isLoading = ref(true);
const isDeleting = ref(false);
const search = ref('');
const roleFilter = ref('');
const statusFilter = ref('');
const showDeleteModal = ref(false);
const memberToDelete = ref(null);

// Computed
const hasFilters = computed(() => {
  return search.value || roleFilter.value || statusFilter.value;
});

const filteredTeamMembers = computed(() => {
  return teamMembers.value.filter(member => {
    // Search by name or role
    const matchesSearch = search.value
      ? member.name.toLowerCase().includes(search.value.toLowerCase()) ||
        member.bio.toLowerCase().includes(search.value.toLowerCase())
      : true;

    // Filter by role
    const matchesRole = roleFilter.value
      ? member.role === roleFilter.value
      : true;

    // Filter by status
    const matchesStatus = statusFilter.value
      ? member.status === statusFilter.value
      : true;

    return matchesSearch && matchesRole && matchesStatus;
  });
});

// Methods
function getRoleLabel(role) {
  const roles = {
    coach: 'Тренер',
    fighter: 'Боец',
    management: 'Руководство',
    staff: 'Персонал'
  };
  return roles[role] || role;
}

function truncateBio(bio, length = 100) {
  if (bio.length <= length) return bio;
  return bio.substring(0, length) + '...';
}

function clearFilters() {
  search.value = '';
  roleFilter.value = '';
  statusFilter.value = '';
}

function openDeleteModal(member) {
  memberToDelete.value = member;
  showDeleteModal.value = true;
}

function deleteTeamMember() {
  if (!memberToDelete.value) return;
  
  isDeleting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    teamMembers.value = teamMembers.value.filter(
      member => member.id !== memberToDelete.value.id
    );
    
    showDeleteModal.value = false;
    memberToDelete.value = null;
    isDeleting.value = false;
  }, 800);
}

// Init
onMounted(() => {
  // Fetch team members (simulated)
  setTimeout(() => {
    teamMembers.value = [
      {
        id: 1,
        name: 'Александр Иванов',
        role: 'coach',
        bio: 'Главный тренер по ударной технике с опытом работы более 15 лет. Чемпион России по боксу.',
        photo: '/team/coach1.jpg',
        status: 'active'
      },
      {
        id: 2,
        name: 'Дмитрий Волков',
        role: 'management',
        bio: 'Президент клуба, бывший профессиональный боец UFC. Основатель спортивной школы.',
        photo: '/team/manager1.jpg',
        status: 'active'
      },
      {
        id: 3,
        name: 'Мария Соколова',
        role: 'staff',
        bio: 'Спортивный врач, специализируется на реабилитации после травм. 10 лет опыта работы со спортсменами высшего уровня.',
        photo: '/team/staff1.jpg',
        status: 'active'
      },
      {
        id: 4,
        name: 'Игорь Петров',
        role: 'fighter',
        bio: 'Действующий чемпион в полутяжелом весе. Рекорд 12-2-0.',
        photo: '/team/fighter1.jpg',
        status: 'active'
      },
      {
        id: 5,
        name: 'Сергей Медведев',
        role: 'coach',
        bio: 'Тренер по борьбе, мастер спорта международного класса по греко-римской борьбе.',
        photo: '/team/coach2.jpg',
        status: 'inactive'
      }
    ];
    
    isLoading.value = false;
  }, 700);
});
</script>

<style scoped>
.team-management {
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

.icon-plus {
  font-size: 16px;
  margin-right: 4px;
  font-weight: bold;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.search-box {
  flex: 1;
  position: relative;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 10px 36px 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2d3748;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.clear-search {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #4a5568;
  white-space: nowrap;
}

.filter-select {
  padding: 8px 28px 8px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2d3748;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.filter-select:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--primary-color, #4F46E5);
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a0aec0;
}

.empty-state svg {
  margin-bottom: 16px;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: #4a5568;
  font-size: 1.2rem;
}

.empty-state p {
  margin: 0 0 16px;
  max-width: 400px;
}

.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.team-card {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.member-photo {
  width: 120px;
  flex-shrink: 0;
}

.member-photo img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.member-info {
  padding: 16px;
  flex-grow: 1;
}

.member-name {
  margin: 0 0 4px;
  font-size: 1.1rem;
  color: #2d3748;
}

.member-role {
  margin: 0 0 8px;
  font-size: 0.9rem;
  color: var(--primary-color, #4F46E5);
  font-weight: 500;
}

.member-bio {
  margin: 0 0 8px;
  font-size: 0.85rem;
  color: #718096;
  line-height: 1.4;
}

.member-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.member-status.active {
  background-color: #def7ec;
  color: #0e9f6e;
}

.member-status.inactive {
  background-color: #feebc8;
  color: #dd6b20;
}

.member-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.team-card:hover .member-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-btn.edit {
  background-color: #ebf4ff;
  color: #3182ce;
}

.action-btn.edit:hover {
  background-color: #bee3f8;
}

.action-btn.delete {
  background-color: #feebeb;
  color: #e53e3e;
}

.action-btn.delete:hover {
  background-color: #fed7d7;
}

/* Modal */
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
  z-index: 999;
}

.modal {
  width: 100%;
  max-width: 480px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2d3748;
}

.close-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #a0aec0;
  cursor: pointer;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  margin: 0 0 12px;
  color: #4a5568;
}

.modal-body p.warning {
  color: #e53e3e;
  font-size: 0.9rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 12px;
  }
  
  .team-list {
    grid-template-columns: 1fr;
  }
  
  .member-photo {
    width: 100px;
  }
  
  .member-photo img {
    height: 120px;
  }
}
</style> 