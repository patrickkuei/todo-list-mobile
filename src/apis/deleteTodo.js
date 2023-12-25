import axios from 'axios';

export default async function (key) {
  const controller = new AbortController();
  try {
    await axios.post(
      `https://script.google.com/macros/s/AKfycbzDYFyFRcmCCZDHs9QF2_Gv5GKmTMMezHEuPWNDelZ5bbcXO6mMENEtxW4drXOoOk1JYQ/exec?key=${key}`,
      {
        signal: controller.signal,
      }
    );
  } catch (error) {
    controller.abort();
  }
}
