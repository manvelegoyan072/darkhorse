import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

// Import UI components
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';

// Create app instance
const app = createApp(App);

// Configure global error handling
app.config.errorHandler = (err, instance, info) => {
  // Log errors to console in development, could be sent to monitoring service in production
  console.error('Vue Error:', err);
  console.error('Error Info:', info);
  
  // You could implement error reporting to a service here
  // if (process.env.NODE_ENV === 'production') {
  //   reportErrorToService(err, info);
  // }
};

// Register global components
app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);

// Use plugins
app.use(router);

// Mount app
app.mount('#app');

// Add development-only console message
if (process.env.NODE_ENV !== 'production') {
  console.log('Running in development mode');
}