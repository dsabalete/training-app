<script setup>
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
  target_weight: 0
})
const currentWeek = ref(1)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const exerciseLogs = ref({})
const editingLog = ref(null)

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
  const data = await $fetch('/api/exercises')
  exercises.value = data
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
            date: selectedDate.value
          }
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
    body: { week_number: 1 }
  })
  await loadPlan()
}

async function progressPlan() {
  if (confirm('Progress to the next week? This will create a new plan with increased targets.')) {
    await $fetch('/api/plans/progress', {
      method: 'POST',
      body: {}
    })
    await loadPlan()
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
    const exercise = plan.value?.days
      ?.flatMap(day => day.exercises || [])
      ?.find(ex => ex.id === exerciseId)
    if (exercise) {
      // Pre-fill with existing logs if any
      const existingLogs = exerciseLogs.value[exerciseId] || []
      for (let i = 1; i <= exercise.target_sets; i++) {
        const existingLog = existingLogs.find(log => log.set_number === i)
        if (existingLog) {
          logData.value[exerciseId][i] = {
            reps: existingLog.reps,
            weight: existingLog.weight,
            logId: existingLog.id
          }
        } else {
          logData.value[exerciseId][i] = { reps: null, weight: null }
        }
      }
    }
  }
}

async function saveLog(exercise) {
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
            notes: null
          }
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
            date: selectedDate.value
          }
        })
      }
    }
  }

  logData.value[exercise.id] = {}
  loggingExercise.value = null
  await loadLogsForDate()
  alert('Sets logged successfully!')
}

function editLog(log) {
  editingLog.value = { ...log }
}

async function updateLog() {
  if (!editingLog.value) return

  await $fetch(`/api/training-logs/${editingLog.value.id}`, {
    method: 'PUT',
    body: {
      reps: editingLog.value.reps,
      weight: editingLog.value.weight,
      date: editingLog.value.date,
      notes: null
    }
  })

  editingLog.value = null
  await loadLogsForDate()
  alert('Log updated successfully!')
}

async function deleteLog() {
  if (!editingLog.value) return

  if (confirm('Are you sure you want to delete this log?')) {
    await $fetch(`/api/training-logs/${editingLog.value.id}`, {
      method: 'DELETE'
    })

    editingLog.value = null
    await loadLogsForDate()
    alert('Log deleted successfully!')
  }
}

function openAddExercise(day) {
  selectedDay.value = day
  showAddExercise.value = true
  newExercise.value = {
    exercise_id: '',
    target_sets: 3,
    target_reps: 10,
    target_weight: 0
  }
}

async function addExerciseToDay() {
  if (!newExercise.value.exercise_id) {
    alert('Please select an exercise')
    return
  }

  await $fetch('/api/workout-exercises', {
    method: 'POST',
    body: {
      workout_day_id: selectedDay.value.id,
      ...newExercise.value
    }
  })

  showAddExercise.value = false
  await loadPlan(currentWeek.value)
}

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">My Workout Plan</h1>
      <button v-if="!plan" @click="createPlan" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Create Plan
      </button>
    </div>

    <div v-if="plan" class="space-y-6">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-4">
            <button @click="navigateWeek(-1)" :disabled="currentWeek <= 1"
              class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
              ← Previous
            </button>
            <div>
              <h2 class="text-xl font-semibold">Week {{ currentWeek }}</h2>
              <p class="text-sm text-gray-600">Started: {{ formatDate(plan.start_date) }}</p>
            </div>
            <button @click="navigateWeek(1)" class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Next →
            </button>
          </div>
          <div class="flex gap-2">
            <button v-if="currentWeek === plan.week_number" @click="progressPlan"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Progress to Week {{ plan.week_number + 1 }}
            </button>
            <button v-if="currentWeek !== plan.week_number" @click="goToCurrentWeek"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Go to Current Week
            </button>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t">
          <label class="block text-sm font-medium text-gray-700 mb-2">Workout Date</label>
          <input v-model="selectedDate" type="date" class="px-3 py-2 border rounded-md" @change="loadLogsForDate" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="day in plan.days" :key="day.id" class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">{{ day.name }}</h3>
            <button @click="openAddExercise(day)" class="text-sm text-blue-600 hover:text-blue-800">
              + Add Exercise
            </button>
          </div>

          <div v-if="day.exercises && day.exercises.length > 0" class="space-y-4">
            <div v-for="exercise in day.exercises" :key="exercise.id" class="border rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <h4 class="font-medium text-gray-900">{{ exercise.exercise_name }}</h4>
                <button @click="toggleLog(exercise.id)" class="text-sm text-blue-600 hover:text-blue-800">
                  {{ loggingExercise === exercise.id ? 'Hide' : 'Log' }}
                </button>
              </div>

              <div class="text-sm text-gray-600 mb-3">
                Target: {{ exercise.target_sets }} sets × {{ exercise.target_reps }} reps @ {{ exercise.target_weight
                }}kg
              </div>

              <!-- Show existing logs for selected date -->
              <div v-if="exerciseLogs[exercise.id] && exerciseLogs[exercise.id].length > 0"
                class="mt-3 mb-3 p-3 bg-gray-50 rounded">
                <div class="text-xs font-medium text-gray-700 mb-2">Logged on {{ formatDate(selectedDate) }}:</div>
                <div class="space-y-1">
                  <div v-for="log in exerciseLogs[exercise.id]" :key="log.id"
                    class="flex justify-between items-center text-sm">
                    <span>Set {{ log.set_number }}: {{ log.reps }} reps @ {{ log.weight }}kg</span>
                    <button @click="editLog(log)" class="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                  </div>
                </div>
              </div>

              <div v-if="loggingExercise === exercise.id" class="mt-4 border-t pt-4">
                <h5 class="font-medium mb-3">Log your sets for {{ formatDate(selectedDate) }}:</h5>
                <div class="space-y-2">
                  <div v-for="setNum in exercise.target_sets" :key="setNum" class="flex gap-2">
                    <span class="flex items-center text-sm font-medium w-12">Set {{ setNum }}:</span>
                    <input v-model.number="logData[exercise.id][setNum].reps" type="number" placeholder="Reps"
                      class="flex-1 px-3 py-2 border rounded-md" />
                    <input v-model.number="logData[exercise.id][setNum].weight" type="number" step="0.5"
                      placeholder="Weight" class="flex-1 px-3 py-2 border rounded-md" />
                  </div>
                </div>
                <button @click="saveLog(exercise)"
                  class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save Sets
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            No exercises yet. Click "Add Exercise" to get started.
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white shadow rounded-lg p-12 text-center">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">No Active Workout Plan</h2>
      <p class="text-gray-600 mb-6">Create a plan to start tracking your workouts.</p>
      <button @click="createPlan" class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Create Your First Plan
      </button>
    </div>

    <!-- Add Exercise Modal -->
    <div v-if="showAddExercise" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="showAddExercise = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Add Exercise to {{ selectedDay?.name }}</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Exercise</label>
            <select v-model="newExercise.exercise_id" class="w-full px-3 py-2 border rounded-md">
              <option value="">Select an exercise</option>
              <option v-for="ex in exercises" :key="ex.id" :value="ex.id">
                {{ ex.name }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sets</label>
              <input v-model.number="newExercise.target_sets" type="number"
                class="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reps</label>
              <input v-model.number="newExercise.target_reps" type="number"
                class="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input v-model.number="newExercise.target_weight" type="number" step="0.5"
                class="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button @click="addExerciseToDay"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add
          </button>
          <button @click="showAddExercise = false"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Log Modal -->
    <div v-if="editingLog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      @click.self="editingLog = null">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Edit Log</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input v-model="editingLog.date" type="date" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Reps</label>
            <input v-model.number="editingLog.reps" type="number" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input v-model.number="editingLog.weight" type="number" step="0.5"
              class="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button @click="updateLog" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Update
          </button>
          <button @click="deleteLog" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Delete
          </button>
          <button @click="editingLog = null"
            class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
