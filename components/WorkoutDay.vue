<script setup>
defineOptions({
  name: 'WorkoutDay',
})

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  exercises: {
    type: Array,
    default: () => [],
  },
  exerciseLogs: {
    type: Object,
    default: () => ({}),
  },
  selectedDate: {
    type: String,
    required: true,
  },
  loggingExercise: {
    type: Number,
    default: null,
  },
  logData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['add-exercise', 'toggle-log', 'save-log', 'edit-log'])
</script>

<template>
  <div class="card workout-day">
    <div class="card-header">
      <div class="workout-day__header">
        <div class="workout-day__title-group">
          <div class="workout-day__indicator"></div>

          <h3 class="workout-day__title">{{ day.name }}</h3>
        </div>
        <button class="btn btn-primary btn-sm" @click="emit('add-exercise', day)">
          <span class="iconify btn-icon" data-icon="heroicons:plus-circle"></span>
          Add Exercise
        </button>
      </div>
    </div>
    <div v-if="exercises && exercises.length > 0" class="workout-day__exercises">
      <ExerciseCard
        v-for="exercise in exercises"
        :key="exercise.id"
        :exercise="exercise"
        :logs="exerciseLogs[exercise.id] || []"
        :selected-date="selectedDate"
        :is-logging="loggingExercise === exercise.id"
        :log-data="logData[exercise.id] || {}"
        @toggle-log="emit('toggle-log', $event)"
        @save-log="emit('save-log', $event)"
        @edit-log="emit('edit-log', $event)"
      />
    </div>

    <div v-else class="workout-day__empty">
      <span class="iconify workout-day__empty-icon" data-icon="heroicons:fire"></span>
      <p class="workout-day__empty-text">No exercises yet.</p>
      <button class="btn btn-primary" @click="emit('add-exercise', day)">
        <span class="iconify btn-icon" data-icon="heroicons:plus-circle"></span>
        Add Exercise
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.workout-day {
  @apply border-2 border-orange-200 bg-linear-to-br from-white to-orange-50;
}

.workout-day__header {
  @apply flex justify-between items-center;
}

.workout-day__title-group {
  @apply flex items-center gap-3;
}

.workout-day__indicator {
  @apply w-3 h-3 bg-orange-500 rounded-full;
}

.workout-day__title {
  @apply text-lg font-bold text-orange-900;
}

.workout-day__exercises {
  @apply space-y-4;
}

.workout-day__empty {
  @apply text-center py-12 bg-linear-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-dashed border-orange-300;
}

.workout-day__empty-icon {
  @apply w-16 h-16 text-orange-400 mx-auto mb-4;
}

.workout-day__empty-text {
  @apply text-orange-900 font-medium mb-4;
}
</style>
