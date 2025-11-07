<script setup>
defineOptions({
  name: 'WorkoutDay'
})

const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  exercises: {
    type: Array,
    default: () => []
  },
  exerciseLogs: {
    type: Object,
    default: () => ({})
  },
  selectedDate: {
    type: String,
    required: true
  },
  loggingExercise: {
    type: Number,
    default: null
  },
  logData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['add-exercise', 'toggle-log', 'save-log', 'edit-log'])
</script>

<template>
  <UCard style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed);">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div style="width: 0.75rem; height: 0.75rem; background: #f97316; border-radius: 9999px;"></div>
          <h3 style="font-size: 1.125rem; font-weight: bold; color: #9a3412;">{{ day.name }}</h3>
        </div>
        <UButton
          label="Add Exercise"
          color="primary"
          variant="solid"
          size="sm"
          icon="i-heroicons-plus-circle"
          @click="emit('add-exercise', day)"
        />
      </div>
    </template>

    <div v-if="exercises && exercises.length > 0" class="space-y-4">
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

    <div v-else style="text-align: center; padding: 3rem 0; background: linear-gradient(to bottom right, #fff7ed, #ffedd5); border-radius: 0.5rem; border: 2px dashed #fdba74;">
      <UIcon name="i-heroicons-fire" class="w-16 h-16" style="color: #fb923c; margin: 0 auto 1rem;" />
      <p style="color: #9a3412; font-weight: 500; margin-bottom: 1rem;">No exercises yet.</p>
      <UButton
        label="Add Exercise"
        color="primary"
        variant="solid"
        icon="i-heroicons-plus-circle"
        @click="emit('add-exercise', day)"
      />
    </div>
  </UCard>
</template>
