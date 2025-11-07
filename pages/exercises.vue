<script setup>
const exercises = ref([])
const showAddForm = ref(false)
const newExercise = ref({
  name: '',
  description: ''
})

onMounted(async () => {
  await loadExercises()
})

async function loadExercises() {
  const data = await $fetch('/api/exercises')
  exercises.value = data
}

async function addExercise() {
  if (!newExercise.value.name) {
    alert('Please enter an exercise name')
    return
  }

  await $fetch('/api/exercises', {
    method: 'POST',
    body: newExercise.value
  })

  newExercise.value = { name: '', description: '' }
  showAddForm.value = false
  await loadExercises()
}
</script>

<template>
  <div class="px-4 py-6">
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Exercise Library</h1>
      <button @click="showAddForm = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Add Exercise
      </button>
    </div>

    <div v-if="showAddForm" class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Add New Exercise</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Exercise Name</label>
          <input v-model="newExercise.name" type="text" placeholder="e.g., Bench Press"
            class="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea v-model="newExercise.description" placeholder="Exercise notes or instructions"
            class="w-full px-3 py-2 border rounded-md" rows="3"></textarea>
        </div>
        <div class="flex gap-3">
          <button @click="addExercise" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Exercise
          </button>
          <button @click="showAddForm = false" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <ul class="divide-y divide-gray-200">
        <li v-for="exercise in exercises" :key="exercise.id" class="p-4 hover:bg-gray-50">
          <h3 class="font-medium text-gray-900">{{ exercise.name }}</h3>
          <p v-if="exercise.description" class="text-sm text-gray-600 mt-1">
            {{ exercise.description }}
          </p>
        </li>
      </ul>
      <div v-if="exercises.length === 0" class="p-8 text-center text-gray-500">
        No exercises yet. Add your first exercise to get started!
      </div>
    </div>
  </div>
</template>