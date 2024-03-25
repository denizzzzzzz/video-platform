<template>
    <div v-for="(video, index) in videos" :key="index" class="video">
        
      <video width="200px" height="200px" controls muted>
          <source :src="video.video_files[0].link" type="video/mp4">
        </video>
        </div>
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import VideoApiService from '@/services/VideoApiService.js';
    
    const videos = ref([]);
    console.log(videos);
    const fetchVideos = async () => {
      try {
        const response = await VideoApiService.searchVideos('Code');
        videos.value = response.data.videos;
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    
    onMounted(fetchVideos);
    </script>
    
    <style></style>