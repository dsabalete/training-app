<script setup>
useHead({
  title: 'Gym Training Tracker',
  meta: [{ name: 'description', content: 'Track your gym training progress' }],
})
</script>

<template>
  <div class="app">
    <UContainer>
      <HeaderNavigation />
    </UContainer>
    <UContainer>
      <NuxtPage />
    </UContainer>
  </div>
</template>
