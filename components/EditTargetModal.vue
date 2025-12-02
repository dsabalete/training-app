<script setup>
defineOptions({
  name: 'EditTargetModal',
})

const props = defineProps({
  exercise: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update', 'close'])

const editingExercise = ref({
  target_sets: 0,
  target_reps: 0,
  target_weight: 0,
})

watch(
  () => props.exercise,
  newVal => {
    if (newVal) {
      editingExercise.value = {
        target_sets: newVal.target_sets,
        target_reps: newVal.target_reps,
        target_weight: newVal.target_weight,
      }
    }
  },
  { immediate: true }
)

function handleUpdate() {
  emit('update', {
    ...props.exercise,
    ...editingExercise.value,
  })
}

import { Icon } from '@iconify/vue'
</script>

<template>
  <div v-if="exercise" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-container">
      <div class="card edit-target-modal">
        <div class="card-header edit-target-modal__header">
          <Icon icon="heroicons:adjustments-horizontal" class="edit-target-modal__header-icon" />
          <h3 class="edit-target-modal__header-title">Edit Targets</h3>
        </div>
        <div class="edit-target-modal__content">
          <div class="edit-target-modal__field">
            <label class="edit-target-modal__label">Sets</label>
            <input
              v-model.number="editingExercise.target_sets"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div class="edit-target-modal__field">
            <label class="edit-target-modal__label">Reps</label>
            <input
              v-model.number="editingExercise.target_reps"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div class="edit-target-modal__field">
            <label class="edit-target-modal__label">Weight (kg)</label>
            <input
              v-model.number="editingExercise.target_weight"
              type="number"
              step="0.5"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div class="card-footer edit-target-modal__footer">
          <button class="btn btn-primary btn-lg edit-target-modal__save-button flex-1" @click="handleUpdate">
            <Icon icon="heroicons:check" class="btn-icon" />
            Save Changes
          </button>
          <button class="btn btn-gray-soft" @click="emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.edit-target-modal {
  @apply border-2 border-orange-200;
}

.edit-target-modal__header {
  @apply bg-linear-to-r from-orange-500 to-orange-600 text-white p-4 -mt-6 -mx-6 rounded-t-lg flex items-center gap-2;
}

.edit-target-modal__header-icon {
  @apply w-5 h-5;
}

.edit-target-modal__header-title {
  @apply text-lg font-bold;
}

.edit-target-modal__content {
  @apply space-y-4 pt-4;
}

.edit-target-modal__field {
  @apply flex flex-col gap-1;
}

.edit-target-modal__label {
  @apply text-sm font-semibold text-orange-900;
}

.edit-target-modal__footer {
  @apply flex gap-3;
}

.edit-target-modal__save-button {
  @apply font-bold;
}
</style>
