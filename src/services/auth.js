// Auth service for admin login

// Admin credentials
const ADMIN_CREDENTIALS = {
  login: 'admin',
  password: 'Darkadmin!1'
};

// Auth token storage key
const AUTH_TOKEN_KEY = 'darkHorse_auth_token';

// Token expiration time (24 hours)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Login with credentials
 * @param {string} login - Admin login
 * @param {string} password - Admin password
 * @returns {Promise<{success: boolean, token?: string, message?: string}>}
 */
export async function login(login, password) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Validate credentials
  if (login === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
    // Generate a simple token (in a real app, you'd use JWT or similar)
    const token = generateToken();
    const tokenData = {
      token,
      expiry: Date.now() + TOKEN_EXPIRATION
    };
    
    // Store token in localStorage
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokenData));
    
    return {
      success: true,
      token
    };
  }
  
  return {
    success: false,
    message: 'Неверный логин или пароль'
  };
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  try {
    const tokenData = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY));
    
    if (!tokenData) {
      return false;
    }
    
    // Check if token has expired
    if (tokenData.expiry < Date.now()) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth error:', error);
    return false;
  }
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Generate a simple token
 * @returns {string}
 */
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export default {
  login,
  logout,
  isAuthenticated
}; 