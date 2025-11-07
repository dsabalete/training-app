<script setup>
defineOptions({
  name: 'WorkoutDatePicker'
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedDate = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})
</script>

<template>
  <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #fed7aa;">
    <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
      <UIcon name="i-heroicons-calendar" class="w-4 h-4" style="color: #f97316;" />
      Workout Date
    </label>
    <UInput
      v-model="selectedDate"
      type="date"
      icon="i-heroicons-calendar"
      color="primary"
      style="border: 2px solid #fed7aa;"
    />
  </div>
</template>
