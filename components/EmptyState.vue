<script setup>
defineOptions({
  name: 'EmptyState',
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'Create',
  },
})

const emit = defineEmits(['action'])
</script>

<template>
  <UCard class="empty-state">
    <div class="empty-state__content">
      <div class="empty-state__icon-wrapper">
        <UIcon name="i-heroicons-fire" class="empty-state__icon" />
      </div>

      <h2 class="empty-state__title">{{ title }}</h2>

      <p class="empty-state__message">{{ message }}</p>
      <UButton
        v-bind="$attrs"
        :label="buttonText"
        color="primary"
        size="xl"
        icon="i-heroicons-plus-circle"
        class="empty-state__button"
        @click="emit('action')"
      />
    </div>
  </UCard>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.empty-state {
  @apply text-center border-2 border-orange-200 bg-linear-to-br from-orange-50 to-white;
}

.empty-state__content {
  @apply py-12;
}

.empty-state__icon-wrapper {
  @apply w-24 h-24 bg-linear-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center;
}

.empty-state__icon {
  @apply w-12 h-12 text-white;
}

.empty-state__title {
  @apply text-2xl font-bold text-orange-900 mb-3;
}

.empty-state__message {
  @apply text-gray-700 mb-8 text-lg;
}

.empty-state__button {
  @apply font-bold px-8 py-3;
}
</style>
