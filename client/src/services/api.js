import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000, // AI calls can be slow
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
