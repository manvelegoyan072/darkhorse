// Mock API service for demonstration purposes
// In a real application, this would be replaced with actual API calls

// Local storage keys
const STORAGE_KEYS = {
  FIGHTERS: 'darkHorse_fighters',
  NEWS: 'darkHorse_news',
  TEAM: 'darkHorse_team',
  SETTINGS: 'darkHorse_settings'
};

// Helper function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize local storage with default data if not exists
function initializeStorage() {
  // Default settings
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
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
    }));
  }
}

// Initialize on import
initializeStorage();

// Settings API
export const settingsApi = {
  async getSettings() {
    await delay();
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      throw error;
    }
  },
  
  async updateSettings(settings) {
    await delay();
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return { success: true, message: 'Settings saved successfully' };
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }
};

// Export API modules
export default {
  settings: settingsApi
}; 