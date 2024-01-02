import axios from 'axios';
import { BASE_URL } from './constant';

export default async function (key) {
  const controller = new AbortController();
  try {
    await axios.post(`${BASE_URL}?action=delete&key=${key}`, {
      signal: controller.signal,
    });
  } catch (error) {
    controller.abort();
  }
}
