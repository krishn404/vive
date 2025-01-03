import axios from 'axios';

const API_URL = 'https://vibe-backend-ujj6.onrender.com/api/search/?name=b&page=0';

export const fetchMusicData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data.results; // Adjust based on the actual structure of the response
  } catch (error) {
    console.error('Error fetching music data:', error);
    throw error; // Rethrow the error for further handling
  }
};
