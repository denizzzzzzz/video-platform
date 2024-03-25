<script setup>
import { onMounted, ref } from 'vue';
import VideoApiService from '@/services/VideoApiService.js';

const videos = ref([]);
console.log(videos)
const fetchVideos = async () => {
  try {
    const response = await VideoApiService.searchVideos('Code');
    videos.value = response.data.videos;
   
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

onMounted(fetchVideos);

function startPreview(event) {
  const videoElement = event.target;
  videoElement.play();
  videoElement.muted = false;
}

function stopPreview(event) {
  const videoElement = event.target;
  videoElement.pause();
  videoElement.currentTime = 0;
}
</script>

<template>
  <div class="w-2/3 mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <div v-for="video in videos" :key="video.id" class="video">
        <div class="w-full overflow-hidden h-32 bg-black">
          <video class="w-full h-full object-cover cursor-pointer" :poster="video.video_pictures[4].picture" muted
          @mouseenter="startPreview"
          @mouseleave="stopPreview">
            <source :src="video.video_files[0].link" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

