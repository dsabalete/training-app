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

const emit = defineEmits(['toggle-log', 'save-log', 'edit-log'])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <UCard class="exercise-card">
    <template #header>
      <div class="exercise-card__header">
        <div class="exercise-card__title-group">
          <div class="exercise-card__indicator"></div>

          <h4 class="exercise-card__title">{{ exercise.exercise_name }}</h4>
        </div>
        <UButton
          :label="isLogging ? 'Hide' : 'Log'"
          color="primary"
          variant="solid"
          size="xs"
          icon="i-heroicons-pencil-square"
          @click="emit('toggle-log', exercise.id)"
        />
      </div>
    </template>
    <div class="exercise-card__content">
      <div class="exercise-card__target">
        <UBadge color="orange" variant="solid" class="font-semibold">
          <UIcon name="i-heroicons-flag" class="w-3 h-3 mr-1" /> Target
        </UBadge>
        <span class="exercise-card__target-text">
          {{ exercise.target_sets }} sets × {{ exercise.target_reps }} reps @ {{ exercise.target_weight }}kg
        </span>
      </div>
      <!-- Show existing logs for selected date -->
      <UCard v-if="logs && logs.length > 0" class="exercise-card__logs">
        <div class="exercise-card__logs-header">
          <UBadge color="green" variant="solid" size="sm" class="font-semibold">
            <UIcon name="i-heroicons-check-circle" class="w-3 h-3 mr-1" /> Logged
          </UBadge>
          <span class="exercise-card__logs-date">on {{ formatDate(selectedDate) }}</span>
        </div>

        <div class="exercise-card__logs-list">
          <div v-for="log in logs" :key="log.id" class="exercise-card__log-item">
            <span class="exercise-card__log-text">
              <span class="exercise-card__log-set">Set {{ log.set_number }}:</span> {{ log.reps }} reps @
              {{ log.weight }}kg
            </span>
            <UButton
              label="Edit"
              color="primary"
              variant="ghost"
              size="xs"
              icon="i-heroicons-pencil"
              @click="emit('edit-log', log)"
            />
          </div>
        </div>
      </UCard>
      <div v-if="isLogging" class="exercise-card__logging">
        <h5 class="exercise-card__logging-title">
          <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" /> Log your sets for {{ formatDate(selectedDate) }}
        </h5>

        <div class="exercise-card__sets">
          <div v-for="setNum in exercise.target_sets" :key="setNum" class="exercise-card__set">
            <span class="exercise-card__set-label">Set {{ setNum }}:</span>
            <UInput
              :model-value="logData[setNum]?.reps"
              type="number"
              placeholder="Reps"
              color="primary"
              class="flex-1"
              @update:model-value="
                value => {
                  if (!logData[setNum]) logData[setNum] = {}
                  logData[setNum].reps = value ? Number(value) : null
                }
              "
            />
            <UInput
              :model-value="logData[setNum]?.weight"
              type="number"
              step="0.5"
              placeholder="Weight (kg)"
              color="primary"
              class="flex-1"
              @update:model-value="
                value => {
                  if (!logData[setNum]) logData[setNum] = {}
                  logData[setNum].weight = value ? Number(value) : null
                }
              "
            />
          </div>
        </div>
        <UButton
          label="Save Sets"
          color="primary"
          block
          icon="i-heroicons-check"
          size="lg"
          class="exercise-card__save-button"
          @click="emit('save-log', exercise)"
        />
      </div>
    </div>
  </UCard>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.exercise-card {
  @apply border-2 border-orange-200;
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
  @apply font-bold text-orange-900;
}

.exercise-card__content {
  @apply space-y-3;
}

.exercise-card__target {
  @apply flex items-center gap-2 text-sm;
}

.exercise-card__target-text {
  @apply text-gray-700 font-medium;
}

.exercise-card__logs {
  @apply bg-linear-to-r from-green-50 to-emerald-100 border-2 border-emerald-300;
}

.exercise-card__logs-header {
  @apply text-xs font-medium mb-2 flex items-center gap-2 text-gray-700;
}

.exercise-card__logs-date {
  @apply text-emerald-900;
}

.exercise-card__logs-list {
  @apply space-y-2 mt-2;
}

.exercise-card__log-item {
  @apply flex justify-between items-center text-sm bg-white rounded px-2 py-1.5 border border-emerald-200;
}

.exercise-card__log-text {
  @apply text-gray-800 font-medium;
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
