<template>
  <div class="news-form">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Редактировать' : 'Добавить' }} новость</h1>
      <BaseButton @click="$router.push('/admin/news')" type="secondary">
        Вернуться к списку
      </BaseButton>
    </div>
    
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
    
    <form v-else @submit.prevent="saveNews" class="form-container">
      <div class="form-grid">
        <!-- Main info section -->
        <div class="form-section">
          <h2 class="section-title">Основная информация</h2>
          
          <div class="input-group">
            <label for="title">Заголовок *</label>
            <input
              id="title"
              v-model="news.title"
              type="text"
              class="form-input"
              required
              placeholder="Заголовок новости"
            />
          </div>
          
          <div class="input-group">
            <label for="category">Категория *</label>
            <select
              id="category"
              v-model="news.category"
              class="form-select"
              required
            >
              <option value="" disabled>Выберите категорию</option>
              <option value="tournament">Турниры</option>
              <option value="interview">Интервью</option>
              <option value="announcement">Анонсы</option>
              <option value="article">Статьи</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="date">Дата публикации *</label>
            <input
              id="date"
              v-model="news.date"
              type="date"
              class="form-input"
              required
            />
          </div>
          
          <div class="input-group">
            <label for="status">Статус</label>
            <select id="status" v-model="news.status" class="form-select">
              <option value="draft">Черновик</option>
              <option value="published">Опубликовано</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="excerpt">Краткое описание *</label>
            <textarea
              id="excerpt"
              v-model="news.excerpt"
              class="form-textarea"
              rows="3"
              required
              placeholder="Краткое описание новости"
            ></textarea>
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
              Рекомендуемый размер: 1280×720 пикселей. Максимальный размер: 2MB.
            </p>
          </div>
        </div>
        
        <!-- Content section -->
        <div class="form-section wide-section">
          <h2 class="section-title">Содержание новости</h2>
          
          <div class="input-group">
            <label for="content">Текст новости *</label>
            <textarea
              id="content"
              v-model="news.content"
              class="form-textarea"
              rows="12"
              required
              placeholder="Введите текст новости"
            ></textarea>
            <p class="input-help">Поддерживается форматирование текста в формате Markdown.</p>
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <BaseButton type="secondary" @click="$router.push('/admin/news')">
          Отмена
        </BaseButton>
        <BaseButton type="primary" :disabled="isSaving" native-type="submit">
          {{ isSaving ? 'Сохранение...' : (isEditMode ? 'Сохранить изменения' : 'Опубликовать новость') }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const newsId = computed(() => route.params.id);
const isEditMode = computed(() => !!newsId.value);
const isLoading = ref(false);
const isSaving = ref(false);
const imagePreview = ref(null);

// Form data
const news = ref({
  title: '',
  category: '',
  date: new Date().toISOString().split('T')[0],
  status: 'draft',
  excerpt: '',
  content: '',
  image: ''
});

// Computed
const hasImage = computed(() => !!imagePreview.value);

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
    news.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeImage() {
  imagePreview.value = null;
  news.value.image = '';
  
  // Reset the file input
  const fileInput = document.getElementById('image-upload');
  if (fileInput) fileInput.value = '';
}

function saveNews() {
  isSaving.value = true;
  
  // Here you would make an API call to save the news
  setTimeout(() => {
    console.log('Saving news:', news.value);
    
    isSaving.value = false;
    router.push('/admin/news');
  }, 1000);
}

// Initialize form for edit mode
onMounted(() => {
  if (isEditMode.value) {
    isLoading.value = true;
    
    // Simulate API call to fetch news data
    setTimeout(() => {
      // For demo purposes, we're using mock data
      if (newsId.value === "1") {
        news.value = {
          id: 1,
          title: 'Хабиб Нурмагомедов проведет семинар в Москве',
          excerpt: 'Бывший чемпион UFC в легком весе Хабиб Нурмагомедов проведет мастер-класс для спортсменов школы единоборств Dark Horse.',
          content: 'Полный текст новости...',
          date: '2023-10-15',
          category: 'announcement',
          status: 'published',
          image: '/news/seminar.jpg'
        };
        
        imagePreview.value = news.value.image;
      }
      
      isLoading.value = false;
    }, 500);
  }
});
</script>

<style scoped>
.news-form {
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
  min-height: 100px;
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
  height: 200px;
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

/* Form actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .form-section {
    padding: 16px;
  }
}
</style> 