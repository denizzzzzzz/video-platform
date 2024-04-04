<template>
  <div>
    <div v-if="videoDetails">
      <video class="w-full h-full" :poster="videoDetails.image" controls>
        <source :src="videoDetails.video_files[0].link" type="video/mp4">
      </video>
      <div class="related-videos">
        <h2>Related Videos</h2>
        <div v-for="video in relatedVideos" :key="video.id" class="related-video">
          <video class="w-1/3" :poster="video.image" controls>
            <source :src="video.video_files[0].link" type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Oops, something went wrong..</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import VideoApiService from '@/services/VideoApiService.js';

export default {
  setup() {
    const route = useRoute();
    const videoDetails = ref(null);
    const relatedVideos = ref([]);

    const fetchVideoDetails = async () => {
      const videoId = route.params.videoId;
      const searchQuery = route.query.search || 'animals';
      try {
        const response = await VideoApiService.getVideoById(videoId);
        videoDetails.value = response.data;
        fetchRelatedVideos(searchQuery);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    const fetchRelatedVideos = async (query) => {
      const videoId = parseInt(route.params.videoId, 10);
      console.log(videoId)
      try {
        const response = await VideoApiService.searchVideos(query);
        console.log(relatedVideos)
        relatedVideos.value = response.data.videos.filter(video => video.id != videoId);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      }
    };

    onMounted(fetchVideoDetails);
    watch(() => [route.params.videoId, route.query.search], fetchVideoDetails);

    return {
      videoDetails,
      relatedVideos,
    };
  },
};


</script>
