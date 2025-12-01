<script setup>
useHead({
  title: 'Gym Training Tracker',
  meta: [{ name: 'description', content: 'Track your gym training progress' }],
  script: [
    {
      src: 'https://code.iconify.design/3/3.1.0/iconify.min.js',
      defer: true,
    },
  ],
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
