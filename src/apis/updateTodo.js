import axios from 'axios';
import { BASE_URL } from './constant';

export default async function ({ key, isChecked, title, isRoutine = false }) {
  const controller = new AbortController();

  try {
    await axios.post(
      `${BASE_URL}?action=update&title=${title}&key=${key}&isChecked=${isChecked}&isRoutine=${isRoutine}`,
      {
        signal: controller.signal,
      }
    );
  } catch (error) {
    controller.abort();
  }
}
