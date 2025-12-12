<script setup>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'ProgressPage',
})

// This is a placeholder for future progress tracking features
// You can expand this to show charts, statistics, and historical data
</script>

<template>
  <div class="progress-page">
    <div class="progress-page__header">
      <div class="progress-page__divider" />

      <h1 class="progress-page__title">Progress Tracker</h1>
    </div>
    <div class="card progress-page__card">
      <div class="progress-page__card-header">
        <Icon icon="heroicons:chart-bar-square" class="progress-page__card-header-icon" />
        <h2 class="progress-page__card-header-title">Coming Soon</h2>
      </div>
      <div class="progress-page__card-content">
        <div class="progress-page__icon-section">
          <div class="progress-page__icon-wrapper">
            <Icon icon="heroicons:chart-bar" class="progress-page__icon" />
          </div>
        </div>

        <div class="progress-page__text-section">
          <p class="progress-page__message">
            Select an exercise from your workout plan to view your training history and progress over time.
          </p>

          <p class="progress-page__description">
            This page will show your logged sets, reps, and weights for each exercise. Future enhancements can include
            charts and progress analytics.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.progress-page {
  @apply space-y-6;
}

.progress-page__header {
  @apply flex items-center gap-3;
}

.progress-page__divider {
  @apply w-1 h-12 bg-linear-to-b from-orange-500 to-orange-600 rounded-full;
}

.progress-page__title {
  @apply text-4xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent;
}

.progress-page__card {
  @apply border-2 border-orange-200 bg-linear-to-br from-white to-orange-50;
}

.progress-page__card-header {
  @apply bg-linear-to-r from-orange-500 to-orange-600 text-white p-4 -m-6 -mt-6 rounded-t-lg flex items-center gap-2;
}

.progress-page__card-header-icon {
  @apply w-5 h-5;
}

.progress-page__card-header-title {
  @apply text-lg font-bold;
}

.progress-page__card-content {
  @apply py-12;
}

.progress-page__icon-section {
  @apply text-center mb-8;
}

.progress-page__icon-wrapper {
  @apply w-24 h-24 bg-linear-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center;
}

.progress-page__icon {
  @apply w-12 h-12 text-white;
}

.progress-page__text-section {
  @apply text-center;
}

.progress-page__message {
  @apply text-orange-900 text-xl font-semibold mb-4;
}

.progress-page__description {
  @apply text-gray-700 text-base;
}
</style>
