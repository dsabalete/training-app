<script setup>
useHead({
  title: 'Gym Training Tracker',
  meta: [{ name: 'description', content: 'Track your gym training progress' }],
  script: [],
})
</script>

<template>
  <div class="app">
    <div class="container mx-auto px-4">
      <HeaderNavigation />
    </div>
    <div class="container mx-auto px-4 py-6">
      <NuxtPage />
    </div>
  </div>
</template>
