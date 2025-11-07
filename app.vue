<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex space-x-8">
            <NuxtLink to="/" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              Workout Plan
            </NuxtLink>
            <NuxtLink to="/exercises" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              Exercises
            </NuxtLink>
            <NuxtLink to="/progress" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              Progress
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
useHead({
  title: 'Gym Training Tracker',
  meta: [
    { name: 'description', content: 'Track your gym training progress' }
  ]
})
</script>
