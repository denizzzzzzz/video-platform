<script setup>
import Home from './components/Home.vue'
import './assets/main.css'
</script>

<template>
  <header>
    <div class="bg-black text-white p-6">
        <div class="max-w-screen-xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <div class="flex-1 text-center">
                    <input type="text" class="w-2/3 px-4 py-2 leading-tight bg-white border-2 rounded-full focus:outline-none focus:bg-white focus:border-blue-500 focus:text-gray-900" placeholder="Search your video's...">
                </div>
                <div class="shrink-0 w-8 h-8"></div>
            </div>
        </div>
    </div>
  </header>

  <main>
    <Home />
  </main>
</template>

<style scoped>
</style>
