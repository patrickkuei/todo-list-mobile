import axios from 'axios';

import { BASE_URL } from './constant';

export default async function (title, key, time) {
  const controller = new AbortController();

  try {
    const res = await axios.post(`${BASE_URL}?action=add&title=${title}&key=${key}&time=${time}`, {
      signal: controller.signal,
    });
  } catch (error) {
    controller.abort();
  }
}
