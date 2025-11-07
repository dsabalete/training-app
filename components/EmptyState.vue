<script setup>
defineOptions({
  name: 'EmptyState'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Create'
  }
})

const emit = defineEmits(['action'])
</script>

<template>
  <UCard style="text-align: center; border: 2px solid #fed7aa; background: linear-gradient(to bottom right, #fff7ed, white);">
    <div style="padding: 3rem 0;">
      <div style="width: 6rem; height: 6rem; background: linear-gradient(to bottom right, #fb923c, #ea580c); border-radius: 9999px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
        <UIcon name="i-heroicons-fire" class="w-12 h-12" style="color: white;" />
      </div>
      <h2 style="font-size: 1.5rem; font-weight: bold; color: #9a3412; margin-bottom: 0.75rem;">{{ title }}</h2>
      <p style="color: #374151; margin-bottom: 2rem; font-size: 1.125rem;">{{ message }}</p>
      <UButton
        :label="buttonText"
        color="primary"
        size="xl"
        icon="i-heroicons-plus-circle"
        style="font-weight: bold; padding: 0.75rem 2rem;"
        @click="emit('action')"
      />
    </div>
  </UCard>
</template>
