<script setup>
defineOptions({
  name: 'EditLogModal'
})

const props = defineProps({
  log: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update', 'delete', 'close'])

const isOpen = computed({
  get: () => !!props.log,
  set: (value) => {
    if (!value) emit('close')
  }
})

const editingLog = computed({
  get: () => props.log ? { ...props.log } : null,
  set: (value) => {
    if (props.log && value) {
      Object.assign(props.log, value)
    }
  }
})
</script>

<template>
  <UModal v-model="isOpen" :ui="{ width: 'max-w-md' }" title="Edit Log" description="Update the date, reps, and weight for this training log entry.">
    <UCard style="border: 2px solid #fed7aa;">
      <template #header>
        <div style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-pencil-square" class="w-5 h-5" />
          <h3 style="font-size: 1.125rem; font-weight: bold;">Edit Log</h3>
        </div>
      </template>

      <div v-if="editingLog" class="space-y-4" style="padding-top: 1rem;">
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" style="color: #f97316;" />
            Date
          </label>
          <UInput
            v-model="editingLog.date"
            type="date"
            icon="i-heroicons-calendar"
            color="primary"
          />
        </div>
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <UIcon name="i-heroicons-hashtag" class="w-4 h-4" style="color: #f97316;" />
            Reps
          </label>
          <UInput
            v-model.number="editingLog.reps"
            type="number"
            icon="i-heroicons-hashtag"
            color="primary"
          />
        </div>
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <UIcon name="i-heroicons-scale" class="w-4 h-4" style="color: #f97316;" />
            Weight (kg)
          </label>
          <UInput
            v-model.number="editingLog.weight"
            type="number"
            step="0.5"
            icon="i-heroicons-scale"
            color="primary"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            label="Update"
            color="primary"
            icon="i-heroicons-check"
            @click="emit('update')"
          />
          <UButton
            label="Delete"
            color="red"
            variant="soft"
            icon="i-heroicons-trash"
            @click="emit('delete')"
          />
          <UButton
            label="Cancel"
            color="gray"
            variant="soft"
            @click="isOpen = false"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
