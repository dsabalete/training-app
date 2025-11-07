<script setup>
defineOptions({
  name: 'WeekNavigation'
})

const props = defineProps({
  currentWeek: {
    type: Number,
    required: true
  },
  planWeekNumber: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['navigate', 'progress', 'goToCurrent'])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div class="flex items-center gap-4">
      <UButton
        icon="i-heroicons-chevron-left"
        color="primary"
        variant="soft"
        :disabled="currentWeek <= 1"
        @click="emit('navigate', -1)"
      >
        Previous
      </UButton>
      <div style="background: linear-gradient(to right, #f97316, #ea580c); padding: 0.5rem 1rem; border-radius: 0.5rem; color: white;">
        <h2 class="text-xl font-bold" style="color: white;">Week {{ currentWeek }}</h2>
        <p class="text-xs" style="color: #fed7aa;">Started: {{ formatDate(startDate) }}</p>
      </div>
      <UButton
        icon="i-heroicons-chevron-right"
        trailing
        color="primary"
        variant="soft"
        @click="emit('navigate', 1)"
      >
        Next
      </UButton>
    </div>
    <div class="flex gap-2">
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
