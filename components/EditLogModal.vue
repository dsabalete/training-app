<script setup>
defineOptions({
  name: 'EditLogModal',
})

const props = defineProps({
  log: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update', 'delete', 'close'])

const isOpen = computed({
  get: () => !!props.log,
  set: value => {
    if (!value) emit('close')
  },
})

const editingLog = ref(null)

watch(
  () => props.log,
  newLog => {
    editingLog.value = newLog ? { ...newLog } : null
  },
  { immediate: true }
)
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{ width: 'max-w-md' }"
    title="Edit Log"
    description="Update the date, reps, and weight for this training log entry."
  >
    <UCard class="edit-log-modal">
      <template #header>
        <div class="edit-log-modal__header">
          <UIcon name="i-heroicons-pencil-square" class="edit-log-modal__header-icon" />
          <h3 class="edit-log-modal__header-title">Edit Log</h3>
        </div>
      </template>
      <div v-if="editingLog" class="edit-log-modal__content">
        <div class="edit-log-modal__field">
          <label class="edit-log-modal__label">
            <UIcon name="i-heroicons-calendar" class="edit-log-modal__label-icon" /> Date
          </label>
          <UInput
            v-model="editingLog.date"
            type="date"
            icon="i-heroicons-calendar"
            color="primary"
            class="edit-log-modal__input"
          />
        </div>

        <div class="edit-log-modal__field">
          <label class="edit-log-modal__label">
            <UIcon name="i-heroicons-hashtag" class="edit-log-modal__label-icon" /> Reps
          </label>
          <UInput v-model.number="editingLog.reps" type="number" icon="i-heroicons-hashtag" color="primary" />
        </div>

        <div class="edit-log-modal__field">
          <label class="edit-log-modal__label">
            <UIcon name="i-heroicons-scale" class="edit-log-modal__label-icon" /> Weight (kg)
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
        <div class="edit-log-modal__footer">
          <UButton label="Update" color="primary" icon="i-heroicons-check" @click="emit('update', editingLog)" />
          <UButton label="Delete" color="red" variant="soft" icon="i-heroicons-trash" @click="emit('delete')" />
          <UButton label="Cancel" color="gray" variant="soft" @click="isOpen = false" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.edit-log-modal {
  @apply border-2 border-orange-200;
}

.edit-log-modal__header {
  @apply bg-linear-to-r from-orange-500 to-orange-600 text-white p-4 -mt-6 -mx-6 rounded-t-lg flex items-center gap-2;
}

.edit-log-modal__header-icon {
  @apply w-5 h-5;
}

.edit-log-modal__header-title {
  @apply text-lg font-bold;
}

.edit-log-modal__content {
  @apply space-y-4 pt-4;
}

.edit-log-modal__field {
  @apply block;
}

.edit-log-modal__label {
  @apply text-sm font-semibold text-orange-900 mb-2 flex items-center gap-2;
}

.edit-log-modal__label-icon {
  @apply w-4 h-4 text-orange-500;
}

.edit-log-modal__footer {
  @apply flex gap-3;
}
</style>
