import axios from 'axios';

export default async function (title, key) {
  const controller = new AbortController();

  try {
    await axios.post(
      `https://script.google.com/macros/s/AKfycbzW71WRMDG0hf1nB-vzoyCz7-kKdPZH-43zLTcZLVGg8kvZwfyj-YFQK4jRWUrq_--ZZg/exec?title=${title}&key=${key}`,
      {
        signal: controller.signal,
      }
    );
  } catch (error) {
    controller.abort();
  }
}
