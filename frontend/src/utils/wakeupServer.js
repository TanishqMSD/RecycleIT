import axios from 'axios';

export const wakeupServer = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/wakeup`, { timeout: 10000 });
    console.log('Server is awake');
  } catch (error) {
    console.log('Server wake-up request failed:', error.message);
  }
};