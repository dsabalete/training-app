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
  <div v-if="isVisible" class="modal-backdrop" @click.self="isVisible = false">
    <div class="modal-container">
      <div class="card add-exercise-modal">
        <div class="card-header add-exercise-modal__header">
          <span class="iconify add-exercise-modal__header-icon" data-icon="heroicons:plus-circle"></span>
          <h3 class="add-exercise-modal__header-title">Add Exercise to {{ selectedDay?.name }}</h3>
        </div>
        <div class="add-exercise-modal__content">
          <div class="add-exercise-modal__field">
            <label class="add-exercise-modal__label">
              <span class="iconify add-exercise-modal__label-icon" data-icon="heroicons:fire"></span>
              Exercise
              <span class="add-exercise-modal__required">*</span>
            </label>
            <select
              :value="newExercise.exercise_id"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              @change="handleExerciseIdChange($event.target.value)"
            >
              <option value="">Select an exercise</option>
              <option v-for="option in exerciseOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="add-exercise-modal__targets">
            <div class="add-exercise-modal__target">
              <label class="add-exercise-modal__target-label">Sets</label>
              <input
                :value="newExercise.target_sets"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                @input="handleSetsChange($event.target.value)"
              />
            </div>

            <div class="add-exercise-modal__target">
              <label class="add-exercise-modal__target-label">Reps</label>
              <input
                :value="newExercise.target_reps"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                @input="handleRepsChange($event.target.value)"
              />
            </div>

            <div class="add-exercise-modal__target">
              <label class="add-exercise-modal__target-label">Weight (kg)</label>
              <input
                :value="newExercise.target_weight"
                type="number"
                step="0.5"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                @input="handleWeightChange($event.target.value)"
              />
            </div>
          </div>
        </div>
        <div class="card-footer add-exercise-modal__footer">
          <button class="btn btn-primary btn-lg add-exercise-modal__add-button flex-1" @click="emit('add')">
            <span class="iconify btn-icon" data-icon="heroicons:check"></span>
            Add
          </button>
          <button class="btn btn-gray-soft" @click="isVisible = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
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
