import axios from 'axios';


const client = axios.create({
  baseURL: 'https://api.pexels.com/videos/',
  headers: {
    Authorization: import.meta.env.VITE_VIDEO_API_KEY, 
  },
});

export default {
  searchVideos(query, perPage = 30) {
    return client.get('search', { params: { query, per_page: perPage } });
  },
};