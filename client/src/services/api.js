import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 120_000, // AI calls can be slow
});

/**
 * POST /api/generate
 * @param {string} question
 * @returns {Promise<BattleResult>}
 */
export async function postGenerate(question) {
  const { data } = await apiClient.post('/generate', { question });
  return data.data; // unwrap { success, data }
}
