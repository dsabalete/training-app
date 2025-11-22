<script setup>
defineOptions({
  name: 'WorkoutDatePicker',
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedDate = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})
</script>

<template>
  <div class="workout-date-picker">
    <label class="workout-date-picker__label">
      <UIcon name="i-heroicons-calendar" class="workout-date-picker__icon" /> Workout Date
    </label>
    <UInput
      v-model="selectedDate"
      type="date"
      icon="i-heroicons-calendar"
      color="primary"
      class="workout-date-picker__input"
    />
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.workout-date-picker {
  @apply mt-4 pt-4 border-t-2 border-orange-200;
}

.workout-date-picker__label {
  @apply flex items-center gap-2 text-sm font-semibold text-orange-900 mb-2;
}

.workout-date-picker__icon {
  @apply w-4 h-4 text-orange-500;
}

.workout-date-picker__input {
  @apply border-2 border-orange-200;
}
</style>
