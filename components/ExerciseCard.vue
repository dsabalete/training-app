<script setup>
defineOptions({
  name: 'ExerciseCard',
})

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
  logs: {
    type: Array,
    default: () => [],
  },
  selectedDate: {
    type: String,
    required: true,
  },
  isLogging: {
    type: Boolean,
    default: false,
  },
  logData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['toggle-log', 'save-log', 'edit-log', 'edit-target'])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="card exercise-card">
    <div class="card-header">
      <div class="exercise-card__header">
        <div class="exercise-card__title-group">
          <div class="exercise-card__indicator"></div>

          <h4 class="exercise-card__title">{{ exercise.exercise_name }}</h4>
        </div>
        <button class="btn btn-primary btn-sm" @click="emit('toggle-log', exercise.id)">
          <Icon icon="heroicons:pencil-square" class="btn-icon" />
          {{ isLogging ? 'Hide' : 'Log' }}
        </button>
      </div>
    </div>
    <div class="exercise-card__content">
      <div class="exercise-card__target">
        <span class="badge badge-orange font-semibold">
          <Icon icon="heroicons:flag" style="width: 0.75rem; height: 0.75rem; margin-right: 0.25rem" />
          Target
        </span>
        <span class="exercise-card__target-text">
          {{ exercise.target_sets }} sets × {{ exercise.target_reps }} reps @ {{ exercise.target_weight }}kg
        </span>
        <button
          class="btn btn-ghost btn-xs p-1 ml-1 text-gray-400 hover:text-orange-500"
          @click="emit('edit-target', exercise)"
        >
          <Icon icon="heroicons:pencil" style="width: 1rem; height: 1rem" />
        </button>
      </div>
      <!-- Show existing logs for selected date -->
      <div v-if="logs && logs.length > 0" class="card exercise-card__logs">
        <div class="exercise-card__logs-header">
          <span class="badge badge-green badge-sm font-semibold">
            <Icon icon="heroicons:check-circle" style="width: 0.75rem; height: 0.75rem; margin-right: 0.25rem" />
            Logged
          </span>
          <span class="exercise-card__logs-date">on {{ formatDate(selectedDate) }}</span>
        </div>

        <div class="exercise-card__logs-list">
          <div v-for="log in logs" :key="log.id" class="exercise-card__log-item">
            <span class="exercise-card__log-text">
              <span class="exercise-card__log-set">Set {{ log.set_number }}:</span> {{ log.reps }} reps @
              {{ log.weight }}kg
            </span>
            <button class="btn btn-primary-soft btn-sm" @click="emit('edit-log', log)">
              <Icon icon="heroicons:pencil" class="btn-icon" />
              Edit
            </button>
          </div>
        </div>
      </div>
      <div v-if="isLogging" class="exercise-card__logging">
        <h5 class="exercise-card__logging-title">
          <Icon icon="heroicons:pencil-square" style="width: 1rem; height: 1rem" /> Log your sets for
          {{ formatDate(selectedDate) }}
        </h5>

        <div class="exercise-card__sets">
          <div v-for="setNum in exercise.target_sets" :key="setNum" class="exercise-card__set">
            <span class="exercise-card__set-label">Set {{ setNum }}:</span>
            <input
              :value="logData[setNum]?.reps"
              type="number"
              placeholder="Reps"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              @input="
                e => {
                  if (!logData[setNum]) logData[setNum] = {}
                  logData[setNum].reps = e.target.value ? Number(e.target.value) : null
                }
              "
            />
            <input
              :value="logData[setNum]?.weight"
              type="number"
              step="0.5"
              placeholder="Weight (kg)"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              @input="
                e => {
                  if (!logData[setNum]) logData[setNum] = {}
                  logData[setNum].weight = e.target.value ? Number(e.target.value) : null
                }
              "
            />
          </div>
        </div>
        <button class="btn btn-primary btn-lg w-full exercise-card__save-button" @click="emit('save-log', exercise)">
          <Icon icon="heroicons:check" class="btn-icon" />
          Save Sets
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.exercise-card {
  @apply border-2 border-orange-200 dark:border-gray-600 dark:bg-gray-800;
}

.exercise-card__header {
  @apply flex justify-between items-start;
}

.exercise-card__title-group {
  @apply flex items-center gap-2;
}

.exercise-card__indicator {
  @apply w-2 h-2 bg-orange-500 rounded-full;
}

.exercise-card__title {
  @apply font-bold text-orange-900 dark:text-orange-100;
}

.exercise-card__content {
  @apply space-y-3;
}

.exercise-card__target {
  @apply flex items-center gap-2 text-sm;
}

.exercise-card__target-text {
  @apply text-gray-700 dark:text-gray-300 font-medium;
}

.exercise-card__logs {
  @apply bg-linear-to-r from-green-50 to-emerald-100 border-2 border-emerald-300;
}

.exercise-card__logs-header {
  @apply text-xs font-medium mb-2 flex items-center gap-2 text-gray-700;
}

.exercise-card__logs-date {
  @apply text-emerald-900 dark:text-emerald-100;
}

.exercise-card__logs-list {
  @apply space-y-2 mt-2;
}

.exercise-card__log-item {
  @apply flex justify-between items-center text-sm bg-white rounded px-2 py-1.5 border border-emerald-200;
}

.exercise-card__log-text {
  @apply text-gray-800 dark:text-gray-200 font-medium;
}

.exercise-card__log-set {
  @apply text-orange-600 font-bold;
}

.exercise-card__logging {
  @apply mt-4 pt-4 border-t-2 border-orange-200 bg-orange-50 rounded-lg p-4;
}

.exercise-card__logging-title {
  @apply font-semibold mb-3 text-orange-900 flex items-center gap-2;
}

.exercise-card__sets {
  @apply space-y-3;
}

.exercise-card__set {
  @apply flex gap-3 items-center bg-white rounded-lg p-2 border border-orange-200;
}

.exercise-card__set-label {
  @apply text-sm font-semibold text-orange-600 w-16;
}

.exercise-card__save-button {
  @apply mt-4 font-semibold;
}
</style>
