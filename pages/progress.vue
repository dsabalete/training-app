<script setup>
defineOptions({
  name: 'ProgressPage'
})

// This is a placeholder for future progress tracking features
// You can expand this to show charts, statistics, and historical data
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <div style="width: 0.25rem; height: 3rem; background: linear-gradient(to bottom, #f97316, #ea580c); border-radius: 9999px;"></div>
      <h1 style="font-size: 2.25rem; font-weight: bold; background: linear-gradient(to right, #ea580c, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Progress Tracker
      </h1>
    </div>

    <UCard style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed);">
      <template #header>
        <div style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5" />
          <h2 style="font-size: 1.125rem; font-weight: bold;">Coming Soon</h2>
        </div>
      </template>

      <div style="padding: 3rem 0;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="width: 6rem; height: 6rem; background: linear-gradient(to bottom right, #fb923c, #ea580c); border-radius: 9999px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
            <UIcon name="i-heroicons-chart-bar" class="w-12 h-12" style="color: white;" />
          </div>
        </div>
        <div style="text-align: center;">
          <p style="color: #9a3412; font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">
            Select an exercise from your workout plan to view your training history and progress over time.
          </p>
          <p style="color: #374151; font-size: 1rem;">
            This page will show your logged sets, reps, and weights for each exercise.
            Future enhancements can include charts and progress analytics.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
