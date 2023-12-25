import axios from 'axios';

export default async function ({ key, isChecked, title }) {
  const controller = new AbortController();

  try {
    await axios.post(
      `https://script.google.com/macros/s/AKfycbxfZ8Og0D1vkMu2oViZ8pA0YW1QnVoXVsWZs86c-hmTJfBTrvGBMoMUjxnvHl--dpJcQA/exec?title=${title}&key=${key}&isChecked=${isChecked}`,
      {
        signal: controller.signal,
      }
    );
  } catch (error) {
    controller.abort();
  }
}
