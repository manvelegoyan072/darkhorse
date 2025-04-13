<template>
  <div class="admin-login-page">
    <div class="login-container">
      <div class="login-header">
        <img src="/logo_black.svg" alt="Dark Horse MMA" class="logo" />
        <h1>Вход в панель администратора</h1>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div class="form-group">
          <label for="login">Логин</label>
          <input 
            type="text" 
            id="login" 
            v-model="credentials.login" 
            class="form-input"
            placeholder="Введите логин" 
            required
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="password-input-container">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="credentials.password" 
              class="form-input"
              placeholder="Введите пароль" 
              required
              :disabled="isLoading"
            />
            <button 
              type="button" 
              @click="togglePasswordVisibility" 
              class="toggle-password-btn"
              :disabled="isLoading"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>
        
        <BaseButton 
          type="primary" 
          :disabled="isLoading" 
          class="login-button"
        >
          <div v-if="isLoading" class="button-spinner"></div>
          <span v-else>Войти</span>
        </BaseButton>
        
        <div class="back-to-site">
          <router-link to="/" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Вернуться на сайт
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../services/auth';

const router = useRouter();
const isLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

const credentials = ref({
  login: '',
  password: ''
});

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleLogin() {
  isLoading.value = true;
  error.value = '';
  
  try {
    const result = await login(credentials.value.login, credentials.value.password);
    
    if (result.success) {
      // Get redirect path from query or use dashboard as default
      const redirectPath = router.currentRoute.value.query.redirect || '/admin/dashboard';
      router.push(redirectPath);
    } else {
      error.value = result.message || 'Ошибка авторизации';
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = 'Произошла ошибка при входе. Пожалуйста, попробуйте позже.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px 24px;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  text-align: center;
}

.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.login-header h1 {
  font-size: 1.5rem;
  margin: 0;
  color: #1e1e2d;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  color: #2d3748;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  color: #1e1e2d;
  background-color: #fff;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--primary-color, #4F46E5);
  outline: none;
}

.password-input-container {
  position: relative;
  display: flex;
}

.password-input-container .form-input {
  flex: 1;
  padding-right: 40px;
}

.toggle-password-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password-btn:hover {
  color: #4a5568;
}

.login-button {
  margin-top: 8px;
  width: 100%;
  height: 44px;
}

.button-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #FEE2E2;
  color: #B91C1C;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.back-to-site {
  text-align: center;
  margin-top: 16px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-dark-secondary, #2d3748);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--primary-color, #4F46E5);
}
</style> 