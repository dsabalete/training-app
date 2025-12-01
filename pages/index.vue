<script setup>
defineOptions({
  name: 'WorkoutPlanPage',
})

const plan = ref(null)
const exercises = ref([])
const loggingExercise = ref(null)
const logData = ref({})
const showAddExercise = ref(false)
const selectedDay = ref(null)
const newExercise = ref({
  exercise_id: '',
  target_sets: 3,
  target_reps: 10,
  target_weight: 0,
})
const currentWeek = ref(1)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const exerciseLogs = ref({})
const editingLog = ref(null)
import { Icon } from '@iconify/vue'

onMounted(async () => {
  await loadPlan()
  await loadExercises()
  if (plan.value) {
    currentWeek.value = plan.value.week_number
    await loadLogsForDate()
  }
})

async function loadPlan(weekNumber = null) {
  if (weekNumber) {
    const data = await $fetch(`/api/plans/${weekNumber}`)
    plan.value = data
    if (data) {
      currentWeek.value = data.week_number
    }
  } else {
    const data = await $fetch('/api/plans/active')
    plan.value = data
    if (data) {
      currentWeek.value = data.week_number
    }
  }
  if (plan.value) {
    await loadLogsForDate()
  }
}

async function loadExercises() {
  try {
    const data = await $fetch('/api/exercises')
    exercises.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error loading exercises:', error)
    exercises.value = []
  }
}

async function navigateWeek(direction) {
  const newWeek = currentWeek.value + direction
  if (newWeek < 1) return
  await loadPlan(newWeek)
}

async function goToCurrentWeek() {
  await loadPlan()
}

async function loadLogsForDate() {
  if (!plan.value || !selectedDate.value) return

  exerciseLogs.value = {}

  // Load logs for all exercises in the current plan
  for (const day of plan.value.days || []) {
    for (const exercise of day.exercises || []) {
      try {
        const logs = await $fetch('/api/training-logs/by-date', {
          query: {
            workout_exercise_id: exercise.id,
            date: selectedDate.value,
          },
        })
        if (logs && logs.length > 0) {
          exerciseLogs.value[exercise.id] = logs
        }
      } catch {
        // No logs for this exercise/date combination
        exerciseLogs.value[exercise.id] = []
      }
    }
  }
}

async function createPlan() {
  await $fetch('/api/plans', {
    method: 'POST',
    body: { week_number: 1 },
  })
  await loadPlan()
}

async function progressPlan() {
  const toast = useToast()
  const confirmed = await new Promise(resolve => {
    resolve(confirm('Progress to the next week? This will create a new plan with increased targets.'))
  })

  if (confirmed) {
    await $fetch('/api/plans/progress', {
      method: 'POST',
      body: {},
    })
    await loadPlan()
    toast.add({ title: 'Plan progressed successfully!', color: 'green' })
  }
}

function toggleLog(exerciseId) {
  if (loggingExercise.value === exerciseId) {
    loggingExercise.value = null
  } else {
    loggingExercise.value = exerciseId
    if (!logData.value[exerciseId]) {
      logData.value[exerciseId] = {}
    }
    // Initialize all set objects for this exercise
    const exercise = plan.value?.days?.flatMap(day => day.exercises || [])?.find(ex => ex.id === exerciseId)
    if (exercise) {
      // Pre-fill with existing logs if any
      const existingLogs = exerciseLogs.value[exerciseId] || []
      for (let i = 1; i <= exercise.target_sets; i++) {
        const existingLog = existingLogs.find(log => log.set_number === i)
        if (existingLog) {
          logData.value[exerciseId][i] = {
            reps: existingLog.reps,
            weight: existingLog.weight,
            logId: existingLog.id,
          }
        } else {
          logData.value[exerciseId][i] = { reps: null, weight: null }
        }
      }
    }
  }
}

async function saveLog(exercise) {
  const toast = useToast()
  const sets = logData.value[exercise.id]
  if (!sets) return

  for (const setNum in sets) {
    const setData = sets[setNum]
    if (setData.reps && setData.weight !== undefined) {
      if (setData.logId) {
        // Update existing log
        await $fetch(`/api/training-logs/${setData.logId}`, {
          method: 'PUT',
          body: {
            reps: setData.reps,
            weight: setData.weight,
            date: selectedDate.value,
            notes: null,
          },
        })
      } else {
        // Create new log
        await $fetch('/api/training-logs', {
          method: 'POST',
          body: {
            workout_exercise_id: exercise.id,
            set_number: parseInt(setNum),
            reps: setData.reps,
            weight: setData.weight,
            date: selectedDate.value,
          },
        })
      }
    }
  }

  logData.value[exercise.id] = {}
  loggingExercise.value = null
  await loadLogsForDate()
  toast.add({ title: 'Sets logged successfully!', color: 'green' })
}

function editLog(log) {
  editingLog.value = { ...log }
}

async function updateLog() {
  const toast = useToast()
  if (!editingLog.value) return

  await $fetch(`/api/training-logs/${editingLog.value.id}`, {
    method: 'PUT',
    body: {
      reps: editingLog.value.reps,
      weight: editingLog.value.weight,
      date: editingLog.value.date,
      notes: null,
    },
  })

  editingLog.value = null
  await loadLogsForDate()
  toast.add({ title: 'Log updated successfully!', color: 'green' })
}

async function deleteLog() {
  const toast = useToast()
  if (!editingLog.value) return

  const confirmed = await new Promise(resolve => {
    resolve(confirm('Are you sure you want to delete this log?'))
  })

  if (confirmed) {
    await $fetch(`/api/training-logs/${editingLog.value.id}`, {
      method: 'DELETE',
    })

    editingLog.value = null
    await loadLogsForDate()
    toast.add({ title: 'Log deleted successfully!', color: 'green' })
  }
}

async function openAddExercise(day) {
  selectedDay.value = day
  // Ensure exercises are loaded before opening modal
  if (!exercises.value || exercises.value.length === 0) {
    await loadExercises()
  }
  showAddExercise.value = true
  newExercise.value = {
    exercise_id: '',
    target_sets: 3,
    target_reps: 10,
    target_weight: 0,
  }
}

async function addExerciseToDay() {
  const toast = useToast()
  if (!newExercise.value.exercise_id) {
    toast.add({ title: 'Please select an exercise', color: 'red' })
    return
  }

  await $fetch('/api/workout-exercises', {
    method: 'POST',
    body: {
      workout_day_id: selectedDay.value.id,
      ...newExercise.value,
    },
  })

  showAddExercise.value = false
  await loadPlan(currentWeek.value)
  toast.add({ title: 'Exercise added successfully!', color: 'green' })
}

async function handlePlanSelected() {
  await loadPlan()
  await loadLogsForDate()
}
</script>

<template>
  <div class="workout-plan">
    <div class="workout-plan__header">
      <div class="workout-plan__header-content">
        <h1 class="workout-plan__title">Workout Plan</h1>
      </div>
      <div class="workout-plan__header-actions">
        <PlanSelector v-if="plan" :current-plan-id="plan.id" @plan-selected="handlePlanSelected" />
        <button v-if="!plan" class="btn btn-primary btn-lg workout-plan__create-button" @click="createPlan">
          <Icon icon="heroicons:plus-circle" class="btn-icon" />
          Create Plan
        </button>
      </div>
    </div>

    <div v-if="plan" class="workout-plan__content">
      <div class="card workout-plan__card">
        <WeekNavigation
          :current-week="currentWeek"
          :plan-week-number="plan.week_number"
          :start-date="plan.start_date"
          @navigate="navigateWeek"
          @progress="progressPlan"
          @go-to-current="goToCurrentWeek"
        />
        <WorkoutDatePicker v-model="selectedDate" @change="loadLogsForDate" />
      </div>
      <div class="workout-plan__grid">
        <WorkoutDay
          v-for="day in plan.days"
          :key="day.id"
          :day="day"
          :exercises="day.exercises || []"
          :exercise-logs="exerciseLogs"
          :selected-date="selectedDate"
          :logging-exercise="loggingExercise"
          :log-data="logData"
          @add-exercise="openAddExercise"
          @toggle-log="toggleLog"
          @save-log="saveLog"
          @edit-log="editLog"
        />
      </div>
    </div>
    <EmptyState
      v-else
      title="No Active Workout Plan"
      message="Create a plan to start tracking your workouts."
      button-text="Create Your First Plan"
      @action="createPlan"
    />
    <AddExerciseModal
      v-model:show="showAddExercise"
      v-model:new-exercise="newExercise"
      :selected-day="selectedDay"
      :exercises="exercises"
      @add="addExerciseToDay"
    />
    <EditLogModal :log="editingLog" @update="updateLog" @delete="deleteLog" @close="editingLog = null" />
  </div>
</template>
