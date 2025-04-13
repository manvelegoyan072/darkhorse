<template>
  <div class="fighter-form">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Редактировать' : 'Добавить' }} бойца</h1>
      <BaseButton @click="$router.push('/admin/fighters')" type="secondary">
        Вернуться к списку
      </BaseButton>
    </div>
    
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
    
    <form v-else @submit.prevent="saveFighter" class="form-container">
      <div class="form-grid">
        <!-- Main info section -->
        <div class="form-section">
          <h2 class="section-title">Основная информация</h2>
          
          <div class="input-group">
            <label for="name">Имя *</label>
            <input
              id="name"
              v-model="fighter.name"
              type="text"
              class="form-input"
              required
              placeholder="Имя бойца"
            />
          </div>
          
          <div class="input-group">
            <label for="nickname">Прозвище</label>
            <input
              id="nickname"
              v-model="fighter.nickname"
              type="text"
              class="form-input"
              placeholder="Прозвище бойца"
            />
          </div>
          
          <div class="input-group">
            <label for="weightClass">Весовая категория *</label>
            <select
              id="weightClass"
              v-model="fighter.weightClass"
              class="form-select"
              required
            >
              <option value="" disabled>Выберите весовую категорию</option>
              <option v-for="wc in weightClasses" :key="wc.value" :value="wc.value">
                {{ wc.label }}
              </option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="nationality">Страна *</label>
            <select
              id="nationality"
              v-model="fighter.nationality"
              class="form-select"
              required
            >
              <option value="" disabled>Выберите страну</option>
              <option v-for="country in countries" :key="country.value" :value="country.value">
                {{ country.label }}
              </option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="record">Рекорд (W-L-D) *</label>
            <input
              id="record"
              v-model="fighter.record"
              type="text"
              class="form-input"
              required
              placeholder="Формат: 21-4-0"
            />
          </div>
          
          <div class="input-group">
            <label for="status">Статус</label>
            <select id="status" v-model="fighter.status" class="form-select">
              <option value="Активен">Активен</option>
              <option value="Неактивен">Неактивен</option>
              <option value="Травмирован">Травмирован</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="organization">Организация</label>
            <select id="organization" v-model="fighter.organization" class="form-select">
              <option value="">Нет</option>
              <option value="ufc">UFC</option>
              <option value="bellator">Bellator</option>
              <option value="one">ONE Championship</option>
              <option value="pfl">PFL</option>
            </select>
          </div>
        </div>
        
        <!-- Physical details section -->
        <div class="form-section">
          <h2 class="section-title">Физические данные</h2>
          
          <div class="form-row">
            <div class="input-group">
              <label for="height">Рост (см)</label>
              <input
                id="height"
                v-model.number="fighter.details.Рост"
                type="number"
                min="0"
                class="form-input"
                placeholder="178"
              />
            </div>
            
            <div class="input-group">
              <label for="weight">Вес (кг)</label>
              <input
                id="weight"
                v-model.number="fighter.details.Вес"
                type="number"
                min="0"
                class="form-input"
                placeholder="70"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="input-group">
              <label for="reach">Размах рук (см)</label>
              <input
                id="reach"
                v-model.number="fighter.details['Размах рук']"
                type="number"
                min="0"
                class="form-input"
                placeholder="180"
              />
            </div>
            
            <div class="input-group">
              <label for="age">Возраст</label>
              <input
                id="age"
                v-model.number="fighter.details.Возраст"
                type="number"
                min="0"
                class="form-input"
                placeholder="25"
              />
            </div>
          </div>
          
          <div class="input-group">
            <label for="birthdate">Дата рождения</label>
            <input
              id="birthdate"
              v-model="fighter.details['Дата рождения']"
              type="date"
              class="form-input"
            />
          </div>
          
          <div class="input-group">
            <label for="style">Стиль</label>
            <input
              id="style"
              v-model="fighter.details.Стиль"
              type="text"
              class="form-input"
              placeholder="Бокс, Борьба"
            />
          </div>
          
          <div class="input-group">
            <label for="team">Команда</label>
            <input
              id="team"
              v-model="fighter.details.Команда"
              type="text"
              class="form-input"
              placeholder="Название команды"
            />
          </div>
        </div>
        
        <!-- Image upload section -->
        <div class="form-section">
          <h2 class="section-title">Изображение</h2>
          
          <div class="image-upload">
            <div class="image-preview" :class="{ 'has-image': hasImage }">
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt="Preview"
                class="preview-img"
              />
              <div v-else class="upload-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Выберите изображение</p>
              </div>
            </div>
            
            <div class="upload-actions">
              <label for="image-upload" class="upload-btn">
                Выбрать файл
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  hidden
                />
              </label>
              <button 
                v-if="hasImage" 
                type="button" 
                class="remove-btn"
                @click="removeImage"
              >
                Удалить
              </button>
            </div>
            
            <p class="upload-help">
              Рекомендуемый размер: 500×750 пикселей. Максимальный размер: 2MB.
            </p>
          </div>
        </div>
        
        <!-- Fight history section -->
        <div class="form-section wide-section">
          <h2 class="section-title">История боев</h2>
          
          <div class="fights-list">
            <div 
              v-for="(fight, index) in fighter.fightHistory" 
              :key="index"
              class="fight-item"
            >
              <div class="fight-header">
                <h3>Бой #{{ index + 1 }}</h3>
                <button 
                  type="button" 
                  class="remove-fight-btn"
                  @click="removeFight(index)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div class="fight-form">
                <div class="form-row">
                  <div class="input-group">
                    <label :for="'fight-date-' + index">Дата</label>
                    <input
                      :id="'fight-date-' + index"
                      v-model="fight.date"
                      type="date"
                      class="form-input"
                      required
                    />
                  </div>
                  
                  <div class="input-group">
                    <label :for="'fight-opponent-' + index">Соперник</label>
                    <input
                      :id="'fight-opponent-' + index"
                      v-model="fight.opponent"
                      type="text"
                      class="form-input"
                      required
                      placeholder="Имя соперника"
                    />
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="input-group">
                    <label :for="'fight-result-' + index">Результат</label>
                    <select
                      :id="'fight-result-' + index"
                      v-model="fight.result"
                      class="form-select"
                      required
                    >
                      <option value="" disabled>Выберите результат</option>
                      <option value="Победа">Победа</option>
                      <option value="Поражение">Поражение</option>
                      <option value="Ничья">Ничья</option>
                    </select>
                  </div>
                  
                  <div class="input-group">
                    <label :for="'fight-method-' + index">Метод</label>
                    <input
                      :id="'fight-method-' + index"
                      v-model="fight.method"
                      type="text"
                      class="form-input"
                      placeholder="Нокаут, Сабмишн, Решение"
                    />
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="input-group">
                    <label :for="'fight-round-' + index">Раунд</label>
                    <input
                      :id="'fight-round-' + index"
                      v-model="fight.round"
                      type="number"
                      min="1"
                      max="5"
                      class="form-input"
                    />
                  </div>
                  
                  <div class="input-group">
                    <label :for="'fight-time-' + index">Время</label>
                    <input
                      :id="'fight-time-' + index"
                      v-model="fight.time"
                      type="text"
                      class="form-input"
                      placeholder="3:45"
                    />
                  </div>
                </div>
                
                <div class="input-group">
                  <label :for="'fight-event-' + index">Событие</label>
                  <input
                    :id="'fight-event-' + index"
                    v-model="fight.event"
                    type="text"
                    class="form-input"
                    placeholder="Название турнира"
                  />
                </div>
              </div>
            </div>
            
            <button 
              type="button" 
              class="add-fight-btn"
              @click="addFight"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Добавить бой
            </button>
          </div>
        </div>
        
        <!-- Biography section -->
        <div class="form-section wide-section">
          <h2 class="section-title">Биография</h2>
          
          <div class="input-group">
            <label for="biography">Описание карьеры и достижений</label>
            <textarea
              id="biography"
              v-model="biographyText"
              class="form-textarea"
              rows="6"
              placeholder="Введите биографию бойца. Каждый абзац будет отображаться отдельно."
            ></textarea>
            <p class="input-help">Для создания абзацев используйте Enter.</p>
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <BaseButton type="secondary" @click="$router.push('/admin/fighters')">
          Отмена
        </BaseButton>
        <BaseButton type="primary" :disabled="isSaving" native-type="submit">
          {{ isSaving ? 'Сохранение...' : (isEditMode ? 'Сохранить изменения' : 'Создать бойца') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fighters, countryFlags } from '../../data/fighters.js';

const route = useRoute();
const router = useRouter();
const fighterId = computed(() => route.params.id);
const isEditMode = computed(() => !!fighterId.value);
const isLoading = ref(false);
const isSaving = ref(false);
const imagePreview = ref(null);

// Form data
const fighter = ref({
  name: '',
  nickname: '',
  weightClass: '',
  nationality: '',
  record: '',
  organization: '',
  status: 'Активен',
  image: '',
  details: {
    'Рост': null,
    'Вес': null,
    'Размах рук': null,
    'Возраст': null,
    'Дата рождения': '',
    'Стиль': '',
    'Команда': ''
  },
  fightHistory: [],
  biography: []
});

// Biography as a single text for easier editing
const biographyText = ref('');

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

// Computed
const hasImage = computed(() => !!imagePreview.value);

// Watch for biography changes
watch(biographyText, (newValue) => {
  fighter.value.biography = newValue
    .split('\n')
    .filter(paragraph => paragraph.trim() !== '');
});

// Methods
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > 2 * 1024 * 1024) {
    alert('Размер файла превышает 2MB.');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.value = e.target.result;
    fighter.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  imagePreview.value = null;
  fighter.value.image = '';
  
  // Reset the file input
  const fileInput = document.getElementById('image-upload');
  if (fileInput) fileInput.value = '';
}

function addFight() {
  fighter.value.fightHistory.push({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    result: '',
    method: '',
    round: 1,
    time: '',
    event: ''
  });
}

function removeFight(index) {
  fighter.value.fightHistory.splice(index, 1);
}

function saveFighter() {
  isSaving.value = true;
  
  // Here you would make an API call to save the fighter
  setTimeout(() => {
    console.log('Saving fighter:', fighter.value);
    
    isSaving.value = false;
    router.push('/admin/fighters');
  }, 1000);
}

// Initialize form for edit mode
onMounted(() => {
  if (isEditMode.value) {
    isLoading.value = true;
    
    // Simulate API call to fetch fighter data
    setTimeout(() => {
      const existingFighter = fighters.find(f => {
        const urlId = f.url ? f.url.split('/').pop() : f.id;
        return urlId === fighterId.value;
      });
      
      if (existingFighter) {
        fighter.value = { ...existingFighter };
        
        // Set biography text from array
        if (Array.isArray(existingFighter.biography)) {
          biographyText.value = existingFighter.biography.join('\n');
        }
        
        // Set image preview
        if (existingFighter.image) {
          imagePreview.value = existingFighter.image;
        }
      }
      
      isLoading.value = false;
    }, 500);
  }
});
</script>

<style scoped>
.fighter-form {
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

.form-container {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.form-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.wide-section {
  grid-column: 1 / -1;
}

.section-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: var(--text-color, #1e1e2d);
  padding-bottom: 12px;
  border-bottom: 1px solid #edf2f7;
}

.input-group {
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: #4a5568;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #2d3748;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .input-group {
  flex: 1;
}

.input-help {
  margin-top: 4px;
  font-size: 0.8rem;
  color: #718096;
}

/* Image upload */
.image-upload {
  width: 100%;
}

.image-preview {
  width: 100%;
  height: 250px;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background-color: #f8fafc;
}

.image-preview.has-image {
  border-style: solid;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a0aec0;
}

.upload-placeholder p {
  margin-top: 8px;
  font-size: 0.9rem;
}

.upload-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.upload-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: var(--primary-color, #4F46E5);
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.upload-btn:hover {
  background-color: #3c37b8;
}

.remove-btn {
  padding: 8px 16px;
  background-color: #f8fafc;
  color: #e53e3e;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background-color: #fee2e2;
  border-color: #f56565;
}

.upload-help {
  font-size: 0.8rem;
  color: #718096;
}

/* Fight history */
.fights-list {
  width: 100%;
}

.fight-item {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 16px;
}

.fight-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.fight-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #4a5568;
}

.remove-fight-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #e53e3e;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-fight-btn:hover {
  background-color: #fee2e2;
  border-color: #f56565;
}

.add-fight-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background-color: #f8fafc;
  border: 1px dashed #cbd5e0;
  border-radius: 6px;
  color: var(--primary-color, #4F46E5);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-fight-btn:hover {
  background-color: #edf2f7;
  border-color: var(--primary-color, #4F46E5);
}

/* Form actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .form-section {
    padding: 16px;
  }
}
</style> 