<template>
  <footer class="footer" id="contact">
    <div class="container">
      <div class="footer-content">
        <div class="footer-columns">
          <!-- Инфо и логотип -->
          <div class="footer-info">
            <div class="footer-logo">
              <img src="/dark-horse-logo_white.svg" alt="Dark Horse Logo" />
              <span>Dark Horse</span>
            </div>
            <div class="footer-contacts">
              <p>
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@dark-horse.com
              </p>
              <p>
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0111.19 19a19.5 19.5 0 01-6-6A19.79 19.79 0 012 4.11V2a2 2 0 012-2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                +7 (999) 123-45-67
              </p>
              <p>
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                г. Москва, ул. Спортивная, 1
              </p>
            </div>
          </div>

          <!-- Форма -->
          <form class="footer-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Имя</label>
              <input v-model="form.name" type="text" id="name" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="form.email" type="email" id="email" required />
            </div>
            <div class="form-group">
              <label for="message">Сообщение</label>
              <textarea v-model="form.message" id="message" required></textarea>
            </div>
            <button type="submit" class="submit-button">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    submitForm() {
      alert('Форма отправлена! (Это заглушка)');
      this.form = { name: '', email: '', message: '' };
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: var(--secondary-color);
  padding: 60px 0;
  color: var(--primary-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0; /* Добавлен верхний отступ для видимости при прокрутке */
}

.footer-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.footer-logo img {
  height: 40px;
}

.footer-contacts p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.footer-form {
  background-color: var(--bg-color);
  padding: 30px;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--accent-color);
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 5px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.submit-button {
  background-color: var(--accent-color);
  color: var(--primary-color);
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button:hover {
  background-color: #505050;
}

@media (max-width: 768px) {
  .footer-columns {
    grid-template-columns: 1fr;
  }
}
</style>