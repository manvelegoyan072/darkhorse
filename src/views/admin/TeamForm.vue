<template>
  <div class="team-form-page">
    <div class="page-header">
      <h1>{{ isEdit ? 'Редактирование' : 'Добавление' }} члена команды</h1>
      <BaseButton type="secondary" @click="$router.push('/admin/team')">
        Назад к списку
      </BaseButton>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
    
    <div v-else-if="notFound" class="error-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Участник команды не найден</h3>
      <p>Участник команды с указанным ID не найден или был удален.</p>
      <BaseButton @click="$router.push('/admin/team')" type="primary">
        Вернуться к списку
      </BaseButton>
    </div>
    
    <form v-else class="team-form" @submit.prevent="saveTeamMember">
      <BaseCard>
        <template #header>
          <h2 class="form-section-title">Основная информация</h2>
        </template>
        
        <div class="form-grid">
          <div class="form-group">
            <label for="name" class="required">Имя и фамилия</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form-control"
              :class="{ 'has-error': errors.name }"
              placeholder="Введите имя и фамилию"
              required
            />
            <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
          </div>
          
          <div class="form-group">
            <label for="role" class="required">Роль</label>
            <select
              id="role"
              v-model="form.role"
              class="form-control"
              :class="{ 'has-error': errors.role }"
              required
            >
              <option value="">Выберите роль</option>
              <option value="coach">Тренер</option>
              <option value="fighter">Боец</option>
              <option value="management">Руководство</option>
              <option value="staff">Персонал</option>
            </select>
            <p v-if="errors.role" class="error-text">{{ errors.role }}</p>
          </div>
          
          <div class="form-group">
            <label for="status" class="required">Статус</label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="form.status" value="active" name="status" />
                <span>Активный</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="form.status" value="inactive" name="status" />
                <span>Неактивный</span>
              </label>
            </div>
            <p v-if="errors.status" class="error-text">{{ errors.status }}</p>
          </div>
          
          <div class="form-group full-width">
            <label for="bio" class="required">Биография</label>
            <textarea
              id="bio"
              v-model="form.bio"
              class="form-control"
              :class="{ 'has-error': errors.bio }"
              rows="4"
              placeholder="Введите биографию"
              required
            ></textarea>
            <p v-if="errors.bio" class="error-text">{{ errors.bio }}</p>
            <p class="hint-text">Осталось символов: {{ 500 - form.bio.length }}</p>
          </div>
        </div>
      </BaseCard>
      
      <BaseCard class="mt-24">
        <template #header>
          <h2 class="form-section-title">Фото</h2>
        </template>
        
        <div class="photo-upload-section">
          <div class="current-photo" v-if="form.photo">
            <img :src="form.photo" alt="Photo preview" />
            <button type="button" class="remove-photo" @click="removePhoto">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
          
          <div class="upload-area" v-else>
            <input
              type="file"
              id="photo"
              ref="photoInput"
              class="file-input"
              accept="image/*"
              @change="handleFileUpload"
            />
            <label for="photo" class="upload-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Нажмите для загрузки фото</span>
              <span class="upload-hint">JPG, PNG, до 2МБ</span>
            </label>
          </div>
          <p v-if="errors.photo" class="error-text">{{ errors.photo }}</p>
        </div>
        
        <div v-if="form.role === 'fighter'" class="fighter-section mt-24">
          <h3>Данные бойца</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <label for="weight">Весовая категория</label>
              <input
                id="weight"
                v-model="form.fighterDetails.weight"
                type="text"
                class="form-control"
                placeholder="Например: 70 кг"
              />
            </div>
            
            <div class="form-group">
              <label for="record">Рекорд</label>
              <input
                id="record"
                v-model="form.fighterDetails.record"
                type="text"
                class="form-control"
                placeholder="Например: 12-2-0"
              />
            </div>
            
            <div class="form-group">
              <label for="style">Стиль</label>
              <input
                id="style"
                v-model="form.fighterDetails.style"
                type="text"
                class="form-control"
                placeholder="Например: Ударная техника"
              />
            </div>
          </div>
        </div>
      </BaseCard>
      
      <div class="form-actions">
        <BaseButton @click="$router.push('/admin/team')" type="secondary">
          Отмена
        </BaseButton>
        <BaseButton type="primary" :disabled="isSaving" :loading="isSaving">
          {{ isSaving ? 'Сохранение...' : (isEdit ? 'Обновить' : 'Создать') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// State
const form = reactive({
  name: '',
  role: '',
  status: 'active',
  bio: '',
  photo: '',
  fighterDetails: {
    weight: '',
    record: '',
    style: ''
  }
});

const errors = reactive({});
const isLoading = ref(false);
const isSaving = ref(false);
const notFound = ref(false);
const photoInput = ref(null);

// Computed
const isEdit = computed(() => {
  return route.params.id !== undefined;
});

// Methods
function validateForm() {
  errors.name = form.name ? '' : 'Имя обязательно для заполнения';
  errors.role = form.role ? '' : 'Выберите роль';
  errors.bio = form.bio ? '' : 'Биография обязательна для заполнения';
  
  if (form.bio && form.bio.length > 500) {
    errors.bio = 'Биография должна быть не более 500 символов';
  }
  
  if (!form.photo) {
    errors.photo = 'Загрузите фото';
  }
  
  return !Object.values(errors).some(error => error);
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // File size validation (2MB)
  if (file.size > 2 * 1024 * 1024) {
    errors.photo = 'Размер файла превышает 2МБ';
    return;
  }
  
  // File type validation
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errors.photo = 'Поддерживаются только форматы JPG и PNG';
    return;
  }
  
  errors.photo = '';
  
  // Create a preview
  const reader = new FileReader();
  reader.onload = (e) => {
    form.photo = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removePhoto() {
  form.photo = '';
  if (photoInput.value) {
    photoInput.value.value = '';
  }
}

function saveTeamMember() {
  if (!validateForm()) {
    // Scroll to the first error
    const firstError = document.querySelector('.has-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  isSaving.value = true;
  
  // Simulate API call
  setTimeout(() => {
    isSaving.value = false;
    
    // Redirect back to the list
    router.push('/admin/team');
    
    // In a real app, you would:
    // 1. Create FormData if there's a file upload
    // 2. Send data to the backend API
    // 3. Handle success/error responses
  }, 1000);
}

// Lifecycle hooks
onMounted(() => {
  if (isEdit.value) {
    isLoading.value = true;
    
    // Simulate API call to get team member data
    setTimeout(() => {
      // Normally would fetch from API based on route.params.id
      const id = parseInt(route.params.id);
      
      // Mock data based on the team list
      const mockData = [
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
          id: 4,
          name: 'Игорь Петров',
          role: 'fighter',
          bio: 'Действующий чемпион в полутяжелом весе. Рекорд 12-2-0.',
          photo: '/team/fighter1.jpg',
          status: 'active',
          fighterDetails: {
            weight: '93 кг',
            record: '12-2-0',
            style: 'Смешанный стиль'
          }
        }
      ];
      
      const foundMember = mockData.find(member => member.id === id);
      
      if (foundMember) {
        // Populate form with existing data
        Object.keys(form).forEach(key => {
          if (key in foundMember) {
            if (key === 'fighterDetails' && foundMember.fighterDetails) {
              Object.assign(form.fighterDetails, foundMember.fighterDetails);
            } else {
              form[key] = foundMember[key];
            }
          }
        });
      } else {
        notFound.value = true;
      }
      
      isLoading.value = false;
    }, 700);
  }
});

// Watch for role changes to reset fighter details if role is changed from 'fighter'
watch(() => form.role, (newRole, oldRole) => {
  if (oldRole === 'fighter' && newRole !== 'fighter') {
    form.fighterDetails = {
      weight: '',
      record: '',
      style: ''
    };
  }
});
</script>

<style scoped>
.team-form-page {
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

.mt-24 {
  margin-top: 24px;
}

.form-section-title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-color, #1e1e2d);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

label.required::after {
  content: '*';
  color: #e53e3e;
  margin-left: 4px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2d3748;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.form-control.has-error {
  border-color: #e53e3e;
}

.error-text {
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 4px;
  margin-bottom: 0;
}

.hint-text {
  color: #718096;
  font-size: 0.8rem;
  margin-top: 4px;
  margin-bottom: 0;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-label input {
  margin-right: 8px;
}

.photo-upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-photo {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
}

.current-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-photo {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.current-photo:hover .remove-photo {
  opacity: 1;
}

.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.upload-area {
  width: 100%;
  max-width: 300px;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  padding: 16px;
}

.upload-label:hover {
  border-color: var(--primary-color, #4F46E5);
  background-color: #f8fafc;
}

.upload-label svg {
  margin-bottom: 12px;
  color: #a0aec0;
}

.upload-hint {
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: 8px;
}

.fighter-section h3 {
  margin: 0 0 16px;
  font-size: 1.1rem;
  color: #2d3748;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.loading-container, .error-state {
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

.error-state {
  text-align: center;
  color: #a0aec0;
}

.error-state svg {
  margin-bottom: 16px;
  color: #e53e3e;
}

.error-state h3 {
  margin: 0 0 8px;
  color: #4a5568;
  font-size: 1.2rem;
}

.error-state p {
  margin: 0 0 16px;
  max-width: 400px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
  }
}
</style> 