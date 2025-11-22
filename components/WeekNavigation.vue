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
      <UButton
        icon="i-heroicons-chevron-left"
        color="primary"
        variant="soft"
        :disabled="currentWeek <= 1"
        @click="emit('navigate', -1)"
      >
        Previous
      </UButton>
      <div class="week-navigation__badge">
        <h2 class="week-navigation__week">Week {{ currentWeek }}</h2>

        <p class="week-navigation__date">Started: {{ formatDate(startDate) }}</p>
      </div>
      <UButton icon="i-heroicons-chevron-right" trailing color="primary" variant="soft" @click="emit('navigate', 1)">
        Next
      </UButton>
    </div>

    <div class="week-navigation__actions">
      <UButton
        v-if="currentWeek === planWeekNumber"
        color="green"
        icon="i-heroicons-arrow-trending-up"
        @click="emit('progress')"
      >
        Progress to Week {{ planWeekNumber + 1 }}
      </UButton>
      <UButton
        v-if="currentWeek !== planWeekNumber"
        color="primary"
        icon="i-heroicons-home"
        @click="emit('goToCurrent')"
      >
        Go to Current Week
      </UButton>
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
