<script setup>
defineOptions({
  name: 'ExerciseCard'
})

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  },
  logs: {
    type: Array,
    default: () => []
  },
  selectedDate: {
    type: String,
    required: true
  },
  isLogging: {
    type: Boolean,
    default: false
  },
  logData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['toggle-log', 'save-log', 'edit-log'])

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <UCard style="border: 2px solid #fed7aa;">
    <template #header>
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-2">
          <div style="width: 0.5rem; height: 0.5rem; background: #f97316; border-radius: 9999px;"></div>
          <h4 style="font-weight: bold; color: #9a3412;">{{ exercise.exercise_name }}</h4>
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

    <div class="space-y-3">
      <div class="flex items-center gap-2 text-sm">
        <UBadge color="orange" variant="solid" class="font-semibold">
          <UIcon name="i-heroicons-flag" class="w-3 h-3 mr-1" />
          Target
        </UBadge>
        <span style="color: #374151; font-weight: 500;">
          {{ exercise.target_sets }} sets × {{ exercise.target_reps }} reps @ {{ exercise.target_weight }}kg
        </span>
      </div>

      <!-- Show existing logs for selected date -->
      <UCard v-if="logs && logs.length > 0" style="background: linear-gradient(to right, #f0fdf4, #d1fae5); border: 2px solid #86efac;">
        <div class="text-xs font-medium mb-2 flex items-center gap-2" style="color: #374151;">
          <UBadge color="green" variant="solid" size="sm" class="font-semibold">
            <UIcon name="i-heroicons-check-circle" class="w-3 h-3 mr-1" />
            Logged
          </UBadge>
          <span style="color: #065f46;">on {{ formatDate(selectedDate) }}</span>
        </div>
        <div class="space-y-2 mt-2">
          <div v-for="log in logs" :key="log.id" class="flex justify-between items-center text-sm" style="background: white; border-radius: 0.25rem; padding: 0.375rem 0.5rem; border: 1px solid #bbf7d0;">
            <span style="color: #1f2937; font-weight: 500;">
              <span style="color: #ea580c; font-weight: bold;">Set {{ log.set_number }}:</span> {{ log.reps }} reps @ {{ log.weight }}kg
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

      <div v-if="isLogging" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #fed7aa; background: #fff7ed; border-radius: 0.5rem; padding: 1rem;">
        <h5 style="font-weight: 600; margin-bottom: 0.75rem; color: #9a3412; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-pencil-square" class="w-4 h-4" />
          Log your sets for {{ formatDate(selectedDate) }}
        </h5>
        <div class="space-y-3">
          <div v-for="setNum in exercise.target_sets" :key="setNum" class="flex gap-3 items-center" style="background: white; border-radius: 0.5rem; padding: 0.5rem; border: 1px solid #fed7aa;">
            <span style="font-size: 0.875rem; font-weight: 600; color: #ea580c; width: 4rem;">Set {{ setNum }}:</span>
            <UInput
              :model-value="logData[setNum]?.reps"
              @update:model-value="(value) => {
                if (!logData[setNum]) logData[setNum] = {}
                logData[setNum].reps = value ? Number(value) : null
              }"
              type="number"
              placeholder="Reps"
              color="primary"
              class="flex-1"
            />
            <UInput
              :model-value="logData[setNum]?.weight"
              @update:model-value="(value) => {
                if (!logData[setNum]) logData[setNum] = {}
                logData[setNum].weight = value ? Number(value) : null
              }"
              type="number"
              step="0.5"
              placeholder="Weight (kg)"
              color="primary"
              class="flex-1"
            />
          </div>
        </div>
        <UButton
          label="Save Sets"
          color="primary"
          block
          icon="i-heroicons-check"
          size="lg"
          style="margin-top: 1rem; font-weight: 600;"
          @click="emit('save-log', exercise)"
        />
      </div>
    </div>
  </UCard>
</template>
