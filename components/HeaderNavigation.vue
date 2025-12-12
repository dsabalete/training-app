<script setup>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'HeaderNavigation',
})

const navItems = [
  { to: '/', label: 'Home', icon: 'i-heroicons-home' },
  { to: '/exercises', label: 'Exercises', icon: 'i-heroicons-dumbbell' },
  { to: '/progress', label: 'Progress', icon: 'i-heroicons-chart-bar' },
]

const route = useRoute()
</script>

<template>
  <div class="header-navigation">
    <div class="app__logo-section">
      <div class="app__logo-wrapper">
        <Icon icon="heroicons:fire" class="app__logo-icon" />
      </div>

      <h1 class="app__title">Gym Training Tracker</h1>
    </div>

    <div class="app__nav">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="btn btn-sm app__nav-button"
        :class="{
          'btn-gray-soft': route.path !== item.to,
          'app__nav-button--active': route.path === item.to,
        }"
      >
        <Icon :icon="item.icon" class="btn-icon" />
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.header-navigation {
  @apply my-4 p-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-t-lg flex items-center justify-between flex-wrap gap-4;
}

.app__logo-section {
  @apply flex items-center gap-3;
}

.app__logo-wrapper {
  @apply w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center;
}

.app__logo-icon {
  @apply w-6 h-6;
}

.app__title {
  @apply text-2xl font-bold text-white;
}

.app__nav {
  @apply flex gap-2;
}

.app__nav-button {
  @apply font-semibold;
}

.app__nav-button--active {
  @apply bg-white/20;
}
</style>
