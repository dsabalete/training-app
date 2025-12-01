<script setup>
const { toasts, remove } = useToast()
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg text-white"
        :class="{
          'bg-green-500': toast.color === 'green',
          'bg-red-500': toast.color === 'red',
          'bg-blue-500': toast.color === 'blue',
          'bg-yellow-500': toast.color === 'yellow',
          'bg-gray-800': !toast.color,
        }"
      >
        <span>{{ toast.title }}</span>
        <button @click="remove(toast.id)" class="ml-2 hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
