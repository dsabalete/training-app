<script setup>
defineOptions({
  name: 'AddExerciseModal',
})

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  selectedDay: {
    type: Object,
    default: null,
  },
  exercises: {
    type: Array,
    default: () => [],
  },
  newExercise: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:show', 'update:newExercise', 'add', 'cancel'])

const isVisible = computed({
  get: () => props.show,
  set: value => emit('update:show', value),
})

const exerciseOptions = computed(() => {
  if (!props.exercises || !Array.isArray(props.exercises)) {
    return []
  }
  return props.exercises.map(ex => ({ label: ex.name, value: ex.id }))
})

function handleExerciseIdChange(value) {
  emit('update:newExercise', { ...props.newExercise, exercise_id: value })
}

function handleSetsChange(value) {
  emit('update:newExercise', {
    ...props.newExercise,
    target_sets: Number(value),
  })
}

function handleRepsChange(value) {
  emit('update:newExercise', {
    ...props.newExercise,
    target_reps: Number(value),
  })
}

function handleWeightChange(value) {
  emit('update:newExercise', {
    ...props.newExercise,
    target_weight: Number(value),
  })
}
</script>

<template>
  <UModal
    v-model="isVisible"
    :ui="{ width: 'max-w-md' }"
    :title="`Add Exercise to ${selectedDay?.name || 'Day'}`"
    description="Select an exercise and configure sets, reps, and weight targets for this workout day."
  >
    <UCard class="add-exercise-modal">
      <template #header>
        <div class="add-exercise-modal__header">
          <UIcon name="i-heroicons-plus-circle" class="add-exercise-modal__header-icon" />
          <h3 class="add-exercise-modal__header-title">Add Exercise to {{ selectedDay?.name }}</h3>
        </div>
      </template>
      <div class="add-exercise-modal__content">
        <div class="add-exercise-modal__field">
          <label class="add-exercise-modal__label">
            <UIcon name="i-heroicons-fire" class="add-exercise-modal__label-icon" /> Exercise
            <span class="add-exercise-modal__required">*</span>
          </label>
          <USelect
            :model-value="newExercise.exercise_id"
            :options="exerciseOptions"
            placeholder="Select an exercise"
            searchable
            color="primary"
            @update:model-value="handleExerciseIdChange"
          />
        </div>

        <div class="add-exercise-modal__targets">
          <div class="add-exercise-modal__target">
            <label class="add-exercise-modal__target-label">Sets</label>
            <UInput
              :model-value="newExercise.target_sets"
              type="number"
              color="primary"
              @update:model-value="handleSetsChange"
            />
          </div>

          <div class="add-exercise-modal__target">
            <label class="add-exercise-modal__target-label">Reps</label>
            <UInput
              :model-value="newExercise.target_reps"
              type="number"
              color="primary"
              @update:model-value="handleRepsChange"
            />
          </div>

          <div class="add-exercise-modal__target">
            <label class="add-exercise-modal__target-label">Weight (kg)</label>
            <UInput
              :model-value="newExercise.target_weight"
              type="number"
              step="0.5"
              color="primary"
              @update:model-value="handleWeightChange"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <div class="add-exercise-modal__footer">
          <UButton
            label="Add"
            color="primary"
            icon="i-heroicons-check"
            block
            size="lg"
            class="add-exercise-modal__add-button"
            @click="emit('add')"
          />
          <UButton label="Cancel" color="gray" variant="soft" @click="isVisible = false" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.add-exercise-modal {
  @apply border-2 border-orange-200;
}

.add-exercise-modal__header {
  @apply bg-linear-to-r from-orange-500 to-orange-600 text-white p-4 -mt-6 -mx-6 rounded-t-lg flex items-center gap-2;
}

.add-exercise-modal__header-icon {
  @apply w-5 h-5;
}

.add-exercise-modal__header-title {
  @apply text-lg font-bold;
}

.add-exercise-modal__content {
  @apply space-y-4 pt-4;
}

.add-exercise-modal__label {
  @apply flex items-center gap-2 text-sm font-semibold text-orange-900 mb-2;
}

.add-exercise-modal__label-icon {
  @apply w-4 h-4 text-orange-500;
}

.add-exercise-modal__required {
  @apply text-red-500;
}

.add-exercise-modal__targets {
  @apply grid grid-cols-3 gap-3;
}

.add-exercise-modal__target-label {
  @apply text-sm font-semibold text-orange-900 mb-2;
}

.add-exercise-modal__footer {
  @apply flex gap-3;
}

.add-exercise-modal__add-button {
  @apply font-bold;
}
</style>
