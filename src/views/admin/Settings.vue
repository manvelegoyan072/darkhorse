<template>
  <div class="admin-settings">
    <div class="page-header">
      <h1>Настройки</h1>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка настроек...</p>
    </div>
    
    <!-- Error Message -->
    <div v-else-if="error" class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>{{ error }}</p>
      <BaseButton type="primary" @click="resetSettings">
        Попробовать снова
      </BaseButton>
    </div>
    
    <!-- Settings Form -->
    <div v-else class="settings-grid">
      <!-- General Settings Section -->
      <div class="settings-section">
        <h2 class="section-title">Основные настройки</h2>
        
        <div class="input-group">
          <label for="site-name">Название сайта</label>
          <input
            id="site-name"
            v-model="settings.siteName"
            type="text"
            class="form-input"
            placeholder="Dark Horse MMA"
          />
        </div>
        
        <div class="input-group">
          <label for="site-description">Описание сайта</label>
          <textarea
            id="site-description"
            v-model="settings.siteDescription"
            class="form-textarea"
            rows="3"
            placeholder="Профессиональный клуб ММА"
          ></textarea>
        </div>
        
        <div class="input-group">
          <label for="contact-email">Контактный email</label>
          <input
            id="contact-email"
            v-model="settings.contactEmail"
            type="email"
            class="form-input"
            placeholder="info@darkhorsemma.com"
          />
        </div>
      </div>
      
      <!-- Social Media Section -->
      <div class="settings-section">
        <h2 class="section-title">Социальные сети</h2>
        
        <div class="input-group">
          <label for="instagram">Instagram</label>
          <input
            id="instagram"
            v-model="settings.social.instagram"
            type="text"
            class="form-input"
            placeholder="https://instagram.com/darkhorsemma"
          />
        </div>
        
        <div class="input-group">
          <label for="facebook">Facebook</label>
          <input
            id="facebook"
            v-model="settings.social.facebook"
            type="text"
            class="form-input"
            placeholder="https://facebook.com/darkhorsemma"
          />
        </div>
        
        <div class="input-group">
          <label for="youtube">YouTube</label>
          <input
            id="youtube"
            v-model="settings.social.youtube"
            type="text"
            class="form-input"
            placeholder="https://youtube.com/darkhorsemma"
          />
        </div>
        
        <div class="input-group">
          <label for="vk">VK</label>
          <input
            id="vk"
            v-model="settings.social.vk"
            type="text"
            class="form-input"
            placeholder="https://vk.com/darkhorsemma"
          />
        </div>
      </div>
      
      <!-- SEO Settings Section -->
      <div class="settings-section">
        <h2 class="section-title">SEO настройки</h2>
        
        <div class="input-group">
          <label for="meta-title">Meta заголовок</label>
          <input
            id="meta-title"
            v-model="settings.meta.title"
            type="text"
            class="form-input"
            placeholder="Dark Horse MMA - Профессиональный клуб ММА"
          />
        </div>
        
        <div class="input-group">
          <label for="meta-description">Meta описание</label>
          <textarea
            id="meta-description"
            v-model="settings.meta.description"
            class="form-textarea"
            rows="3"
            placeholder="Профессиональный клуб MMA, подготовка бойцов мирового уровня"
          ></textarea>
        </div>
        
        <div class="input-group">
          <label for="meta-keywords">Meta ключевые слова</label>
          <input
            id="meta-keywords"
            v-model="settings.meta.keywords"
            type="text"
            class="form-input"
            placeholder="ММА, бойцы, единоборства, тренировки, бокс, борьба"
          />
        </div>
      </div>
      
      <!-- API Settings Section -->
      <div class="settings-section">
        <h2 class="section-title">API настройки</h2>
        
        <div class="input-group">
          <label for="api-key">API ключ</label>
          <div class="api-key-input">
            <input
              id="api-key"
              v-model="settings.apiKey"
              type="password"
              class="form-input"
              placeholder="************************"
              :type="showApiKey ? 'text' : 'password'"
            />
            <button @click="toggleApiKeyVisibility" type="button" class="toggle-password-btn">
              {{ showApiKey ? 'Скрыть' : 'Показать' }}
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <label for="api-url">API URL</label>
          <input
            id="api-url"
            v-model="settings.apiUrl"
            type="text"
            class="form-input"
            placeholder="https://api.example.com/v1"
          />
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div v-if="!isLoading && !error" class="settings-actions">
      <BaseButton type="secondary" @click="resetSettings">
        Сбросить
      </BaseButton>
      <BaseButton type="primary" @click="saveSettings" :disabled="isSaving">
        {{ isSaving ? 'Сохранение...' : 'Сохранить настройки' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { settingsApi } from '../../services/api.js';

const isSaving = ref(false);
const showApiKey = ref(false);
const isLoading = ref(true);
const error = ref(null);

// Default settings
const defaultSettings = {
  siteName: 'Dark Horse MMA',
  siteDescription: 'Профессиональный клуб ММА, подготовка бойцов мирового уровня',
  contactEmail: 'info@darkhorsemma.com',
  social: {
    instagram: 'https://instagram.com/darkhorsemma',
    facebook: 'https://facebook.com/darkhorsemma',
    youtube: 'https://youtube.com/darkhorsemma',
    vk: 'https://vk.com/darkhorsemma'
  },
  meta: {
    title: 'Dark Horse MMA - Профессиональный клуб ММА',
    description: 'Профессиональный клуб MMA, подготовка бойцов мирового уровня',
    keywords: 'ММА, бойцы, единоборства, тренировки, бокс, борьба'
  },
  apiKey: '',
  apiUrl: ''
};

// Initialize settings with defaults
const settings = ref({ ...defaultSettings });

// Get settings from API
onMounted(async () => {
  isLoading.value = true;
  try {
    const data = await settingsApi.getSettings();
    if (data) {
      settings.value = data;
    }
    error.value = null;
  } catch (err) {
    console.error('Failed to load settings:', err);
    error.value = 'Не удалось загрузить настройки. Пожалуйста, попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
});

// Methods
function toggleApiKeyVisibility() {
  showApiKey.value = !showApiKey.value;
}

function resetSettings() {
  settings.value = { ...defaultSettings };
}

async function saveSettings() {
  isSaving.value = true;
  error.value = null;
  
  try {
    await settingsApi.updateSettings(settings.value);
    alert('Настройки успешно сохранены');
  } catch (err) {
    console.error('Failed to save settings:', err);
    error.value = 'Не удалось сохранить настройки. Пожалуйста, попробуйте позже.';
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.admin-settings {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-dark, #1e1e2d);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.error-container svg {
  color: #EF4444;
  margin-bottom: 16px;
  width: 48px;
  height: 48px;
}

.error-container p {
  margin-bottom: 24px;
  color: #4B5563;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.settings-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: var(--text-dark, #1e1e2d);
  padding-bottom: 12px;
  border-bottom: 1px solid #edf2f7;
}

.input-group {
  margin-bottom: 16px;
}

.input-group:last-child {
  margin-bottom: 0;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--text-dark-secondary, #2d3748);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.95rem;
  color: var(--text-dark, #1e1e2d);
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.api-key-input {
  display: flex;
  gap: 8px;
}

.api-key-input .form-input {
  flex: 1;
}

.toggle-password-btn {
  padding: 8px 12px;
  background-color: #f8fafc;
  color: #718096;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.toggle-password-btn:hover {
  background-color: #edf2f7;
  color: #4a5568;
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 768px) {
  .settings-section {
    padding: 16px;
  }
  
  .settings-actions {
    flex-direction: column-reverse;
    gap: 12px;
  }
  
  .settings-actions button {
    width: 100%;
  }
}
</style> 