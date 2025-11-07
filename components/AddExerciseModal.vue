<script setup>
defineOptions({
  name: 'AddExerciseModal'
})

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  selectedDay: {
    type: Object,
    default: null
  },
  exercises: {
    type: Array,
    default: () => []
  },
  newExercise: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:show', 'update:newExercise', 'add', 'cancel'])

const isVisible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
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
  emit('update:newExercise', { ...props.newExercise, target_sets: Number(value) })
}

function handleRepsChange(value) {
  emit('update:newExercise', { ...props.newExercise, target_reps: Number(value) })
}

function handleWeightChange(value) {
  emit('update:newExercise', { ...props.newExercise, target_weight: Number(value) })
}
</script>

<template>
  <UModal v-model="isVisible" :ui="{ width: 'max-w-md' }" :title="`Add Exercise to ${selectedDay?.name || 'Day'}`" description="Select an exercise and configure sets, reps, and weight targets for this workout day.">
    <UCard style="border: 2px solid #fed7aa;">
      <template #header>
        <div style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
          <h3 style="font-size: 1.125rem; font-weight: bold;">Add Exercise to {{ selectedDay?.name }}</h3>
        </div>
      </template>

      <div class="space-y-4" style="padding-top: 1rem;">
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <UIcon name="i-heroicons-fire" class="w-4 h-4" style="color: #f97316;" />
            Exercise <span style="color: #ef4444;">*</span>
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

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem;">Sets</label>
            <UInput
              :model-value="newExercise.target_sets"
              type="number"
              color="primary"
              @update:model-value="handleSetsChange"
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem;">Reps</label>
            <UInput
              :model-value="newExercise.target_reps"
              type="number"
              color="primary"
              @update:model-value="handleRepsChange"
            />
          </div>
          <div>
            <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem;">Weight (kg)</label>
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
        <div class="flex gap-3">
          <UButton
            label="Add"
            color="primary"
            icon="i-heroicons-check"
            block
            size="lg"
            style="font-weight: bold;"
            @click="emit('add')"
          />
          <UButton
            label="Cancel"
            color="gray"
            variant="soft"
            @click="isVisible = false"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
