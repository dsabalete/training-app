<script setup>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'PlanSelector',
})

const props = defineProps({
  currentPlanId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['planSelected'])

const isOpen = ref(false)
const plans = ref([])
const loading = ref(false)

async function loadPlans() {
  loading.value = true
  try {
    const data = await $fetch('/api/plans')
    plans.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error loading plans:', error)
    plans.value = []
  } finally {
    loading.value = false
  }
}

async function selectPlan(plan) {
  try {
    await $fetch(`/api/plans/${plan.id}/activate`, {
      method: 'POST',
    })
    emit('planSelected', plan)
    isOpen.value = false
  } catch (error) {
    console.error('Error activating plan:', error)
    alert('Failed to switch plan')
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}

watch(isOpen, newValue => {
  if (newValue) {
    loadPlans()
  }
})
</script>

<template>
  <div class="plan-selector">
    <button class="btn btn-primary-soft" @click="isOpen = true">
      <Icon icon="heroicons:queue-list" class="btn-icon" />
      Select Plan
    </button>

    <div v-if="isOpen" class="modal-backdrop" @click.self="isOpen = false">
      <div class="modal-container">
        <div class="card">
          <div class="card-header">
            <h3 class="text-xl font-bold">Select Workout Plan</h3>
          </div>

          <div v-if="loading" class="plan-selector__loading">
            <p>Loading plans...</p>
          </div>

          <div v-else-if="plans.length === 0" class="plan-selector__empty">
            <p>No workout plans found. Create your first plan to get started!</p>
          </div>

          <div v-else class="plan-selector__list">
            <div
              v-for="plan in plans"
              :key="plan.id"
              class="plan-selector__item"
              :class="{ 'plan-selector__item--active': plan.is_active }"
              @click="selectPlan(plan)"
            >
              <div class="plan-selector__item-header">
                <h4 class="plan-selector__item-title">Week {{ plan.week_number }}</h4>
                <span v-if="plan.is_active" class="badge badge-green-soft">Active</span>
              </div>
              <div class="plan-selector__item-details">
                <p class="plan-selector__item-date">Started: {{ formatDate(plan.start_date) }}</p>
                <p v-if="plan.end_date" class="plan-selector__item-date">Ended: {{ formatDate(plan.end_date) }}</p>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="flex justify-end">
              <button class="btn btn-gray-soft" @click="isOpen = false">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@reference "tailwindcss";

.plan-selector__loading,
.plan-selector__empty {
  @apply text-center py-8 text-gray-500;
}

.plan-selector__list {
  @apply space-y-3 max-h-96 overflow-y-auto;
}

.plan-selector__item {
  @apply p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer transition-all hover:border-orange-500 hover:shadow-md;
}

.plan-selector__item--active {
  @apply border-green-500 bg-green-50 dark:bg-green-900/20;
}

.plan-selector__item-header {
  @apply flex justify-between items-center mb-2;
}

.plan-selector__item-title {
  @apply text-lg font-semibold;
}

.plan-selector__item-details {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.plan-selector__item-date {
  @apply text-xs;
}
</style>
