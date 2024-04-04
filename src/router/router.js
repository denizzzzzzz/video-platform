import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import VideoDetails from '../components/VideoDetails.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'homepage'
  },
  {
    path: '/video/:videoId',
    component: VideoDetails,
    props: true,
    name: 'VideoDetails', 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
