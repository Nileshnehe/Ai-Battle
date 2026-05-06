import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000, // AI calls can be slow
});

// Add Bearer token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * POST /api/chat
 * @param {string} question
 * @returns {Promise<Chat>}
 */
export async function postChat(question) {
  const { data } = await apiClient.post('/chat', { question });
  return data.data;
}

/**
 * GET /api/chat
 * @returns {Promise<Chat[]>}
 */
export async function getChats() {
  const { data } = await apiClient.get('/chat');
  return data.data;
}

/**
 * GET /api/chat/:id
 * @param {string} id
 * @returns {Promise<Chat>}
 */
export async function getChat(id) {
  const { data } = await apiClient.get(`/chat/${id}`);
  return data.data;
}

/**
 * POST /api/auth/register
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function register(name, email, password) {
  const { data } = await apiClient.post('/auth/register', { name, email, password });
  return data.data;
}

/**
 * POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  return data.data;
}

/**
 * Logout - clears auth token
 */
export function logout() {
  localStorage.removeItem('authToken');
}
