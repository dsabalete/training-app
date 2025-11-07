<template>
  <div style="min-height: 100vh; background: linear-gradient(to bottom right, #f9fafb, #fff7ed, #f9fafb);">
    <UContainer class="py-6">
      <UCard class="mb-6" style="border: 2px solid #fed7aa; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <template #header>
          <div
            style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div
                style="width: 2.5rem; height: 2.5rem; background: rgba(255, 255, 255, 0.2); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center;">
                <UIcon name="i-heroicons-fire" class="w-6 h-6" />
              </div>
              <h1 style="font-size: 1.5rem; font-weight: bold; color: white;">Gym Training Tracker</h1>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <UButton v-for="item in navItems" :key="item.to" :to="item.to" :label="item.label" :icon="item.icon"
                :color="route.path === item.to ? 'white' : 'white'"
                :variant="route.path === item.to ? 'solid' : 'ghost'" size="sm" class="font-semibold"
                :style="route.path === item.to ? 'background: rgba(255, 255, 255, 0.2);' : ''" />
            </div>
          </div>
        </template>
      </UCard>
    </UContainer>
    <UContainer>
      <NuxtPage />
    </UContainer>
  </div>
</template>

<script setup>
useHead({
  title: 'Gym Training Tracker',
  meta: [
    { name: 'description', content: 'Track your gym training progress' }
  ]
})

const route = useRoute()

const navItems = [
  { label: 'Workout Plan', to: '/', icon: 'i-heroicons-calendar' },
  { label: 'Exercises', to: '/exercises', icon: 'i-heroicons-list-bullet' },
  { label: 'Progress', to: '/progress', icon: 'i-heroicons-chart-bar' }
]
</script>
