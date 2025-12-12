<script setup>
import { Icon } from '@iconify/vue'

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
  <div v-if="isOpen" class="modal-backdrop" @click.self="isOpen = false">
    <div class="modal-container">
      <div class="card" style="border: 2px solid #fed7aa">
        <div class="edit-log-modal__header">
          <Icon icon="heroicons:pencil-square" class="edit-log-modal__header-icon" />
          <h3 class="edit-log-modal__header-title">Edit Log</h3>
        </div>
        <div v-if="editingLog" class="edit-log-modal__content">
          <div class="edit-log-modal__field">
            <label class="edit-log-modal__label">
              <Icon icon="heroicons:calendar" class="edit-log-modal__label-icon" /> Date
            </label>
            <input
              v-model="editingLog.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div class="edit-log-modal__field">
            <label class="edit-log-modal__label">
              <Icon icon="heroicons:hashtag" class="edit-log-modal__label-icon" /> Reps
            </label>
            <input
              v-model.number="editingLog.reps"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div class="edit-log-modal__field">
            <label class="edit-log-modal__label">
              <Icon icon="heroicons:scale" class="edit-log-modal__label-icon" /> Weight (kg)
            </label>
            <input
              v-model.number="editingLog.weight"
              type="number"
              step="0.5"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div class="edit-log-modal__footer card-footer">
          <button class="btn btn-primary" @click="emit('update', editingLog)">
            <Icon icon="heroicons:check" class="btn-icon" />
            Update
          </button>
          <button class="btn btn-red-soft" @click="emit('delete')">
            <Icon icon="heroicons:trash" class="btn-icon" />
            Delete
          </button>
          <button class="btn btn-gray-soft" @click="isOpen = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
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
