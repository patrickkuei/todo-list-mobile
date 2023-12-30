import axios from 'axios';

export default async function (title, key, time) {
  const controller = new AbortController();

  try {
    await axios.post(
      `https://script.google.com/macros/s/AKfycbxgvpn2AV0IdISpXkY6Yj42sD7smCR7Iqb4A-V_CQJFb852Bx_-TSHCV1GEHD4B6MjE7Q/exec?title=${title}&key=${key}&time=${time}`,
      {
        signal: controller.signal,
      }
    );
  } catch (error) {
    controller.abort();
  }
}
