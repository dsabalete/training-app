<script setup>
defineOptions({
  name: 'WeekNavigation',
})

defineProps({
  currentWeek: {
    type: Number,
    required: true,
  },
  planWeekNumber: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate', 'progress', 'goToCurrent'])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="week-navigation">
    <div class="week-navigation__controls">
      <button class="btn btn-primary-soft" :disabled="currentWeek <= 1" @click="emit('navigate', -1)">
        <span class="iconify btn-icon" data-icon="heroicons:chevron-left"></span>
        Previous
      </button>
      <div class="week-navigation__badge">
        <h2 class="week-navigation__week">Week {{ currentWeek }}</h2>

        <p class="week-navigation__date">Started: {{ formatDate(startDate) }}</p>
      </div>
      <button class="btn btn-primary-soft" @click="emit('navigate', 1)">
        Next
        <span class="iconify btn-icon" data-icon="heroicons:chevron-right"></span>
      </button>
    </div>

    <div class="week-navigation__actions">
      <button v-if="currentWeek === planWeekNumber" class="btn btn-green" @click="emit('progress')">
        <span class="iconify btn-icon" data-icon="heroicons:arrow-trending-up"></span>
        Progress to Week {{ planWeekNumber + 1 }}
      </button>
      <button v-if="currentWeek !== planWeekNumber" class="btn btn-primary" @click="emit('goToCurrent')">
        <span class="iconify btn-icon" data-icon="heroicons:home"></span>
        Go to Current Week
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.week-navigation {
  @apply flex justify-between items-center mb-4;
}

.week-navigation__controls {
  @apply flex items-center gap-4;
}

.week-navigation__badge {
  @apply bg-linear-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-lg text-white;
}

.week-navigation__week {
  @apply text-xl font-bold text-white;
}

.week-navigation__date {
  @apply text-xs text-orange-200;
}

.week-navigation__actions {
  @apply flex gap-2;
}
</style>
