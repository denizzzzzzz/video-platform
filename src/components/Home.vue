<template>
  <div class="w-2/3 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <div v-for="video in videos" :key="video.id" class="video" @click="selectVideo(video)">
        <div class="w-full overflow-hidden h-32 bg-black">
          <video
            class="w-full h-full object-cover cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 ease-in-out"
            :poster="video.video_pictures[4].picture"
            muted
            @mouseenter="startPreview"
            @mouseleave="stopPreview"
          >
            <source :src="video.video_files[0].link" type="video/mp4">
          </video>
        </div>
        <h3 class="text-center mt-4 text-lg text-white">{{ createTitle(video.url) }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VideoApiService from '@/services/VideoApiService.js';

const route = useRoute();
const router = useRouter();
const videos = ref([]);

const fetchVideos = async () => {
  const query = route.query.search || 'animals';
  try {
    const response = await VideoApiService.searchVideos(query);
    videos.value = response.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

onMounted(fetchVideos);
watch(() => route.query.search, fetchVideos);

function startPreview(event) {
  const videoElement = event.target;
  videoElement.play();
  videoElement.muted = true; 
}

function stopPreview(event) {
  const videoElement = event.target;
  videoElement.pause();
  videoElement.currentTime = 0;
}
function selectVideo(video) {
  const currentSearchQuery = route.query.search; // Retrieve the current search query from the route
  router.push({ 
    name: 'VideoDetails', 
    params: { videoId: video.id }, 
    query: { search: currentSearchQuery } // Pass it along with the navigation
  });
}


function createTitle(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname.replace(/^\/|\/$/g, '');
  const titlePattern = path.match(/video\/(.*?)(-\d+)?\/?$/);
  return titlePattern && titlePattern[1]
    ? titlePattern[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Video Title";
}
</script>