<script setup>
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'ExercisesPage',
})

const exercises = ref([])
const showAddForm = ref(false)
const newExercise = ref({
  name: '',
  description: '',
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
    console.error('Please enter an exercise name')
    alert('Please enter an exercise name')
    return
  }

  await $fetch('/api/exercises', {
    method: 'POST',
    body: newExercise.value,
  })

  newExercise.value = { name: '', description: '' }
  showAddForm.value = false
  await loadExercises()
  console.log('Exercise added successfully!')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <h1
          style="
            font-size: 2.25rem;
            font-weight: bold;
            background: linear-gradient(to right, #ea580c, #f97316);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
        >
          Exercise Library
        </h1>
      </div>
      <button class="btn btn-primary btn-lg" style="font-weight: bold" @click="showAddForm = true">
        <Icon icon="heroicons:plus-circle" class="btn-icon" />
        Add Exercise
      </button>
    </div>
    <div
      v-if="showAddForm"
      class="card"
      style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed)"
    >
      <div
        style="
          background: linear-gradient(to right, #f97316, #ea580c);
          color: white;
          padding: 1rem;
          margin: -1.5rem -1.5rem 0 -1.5rem;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        "
      >
        <Icon icon="heroicons:plus-circle" style="width: 1.25rem; height: 1.25rem" />
        <h2 style="font-size: 1.125rem; font-weight: bold">Add New Exercise</h2>
      </div>
      <div class="space-y-4" style="padding-top: 1rem">
        <div>
          <label
            style="
              display: block;
              font-size: 0.875rem;
              font-weight: 600;
              color: #9a3412;
              margin-bottom: 0.5rem;
              display: flex;
              align-items: center;
              gap: 0.5rem;
            "
          >
            <Icon icon="heroicons:fire" style="width: 1rem; height: 1rem; color: #f97316" />
            Exercise Name <span style="color: #ef4444">*</span>
          </label>
          <input
            v-model="newExercise.name"
            type="text"
            placeholder="e.g., Bench Press"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem"
            >Description (optional)</label
          >
          <textarea
            v-model="newExercise.description"
            placeholder="Exercise notes or instructions"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          ></textarea>
        </div>
      </div>
      <div class="card-footer">
        <div class="flex gap-3">
          <button class="btn btn-primary btn-lg" style="font-weight: bold" @click="addExercise">
            <Icon icon="heroicons:check" class="btn-icon" />
            Add Exercise
          </button>
          <button class="btn btn-gray-soft" @click="showAddForm = false">Cancel</button>
        </div>
      </div>
    </div>
    <div class="card" style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed)">
      <div
        style="
          background: linear-gradient(to right, #f97316, #ea580c);
          color: white;
          padding: 1rem;
          margin: -1.5rem -1.5rem 0 -1.5rem;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        "
      >
        <Icon icon="heroicons:list-bullet" style="width: 1.25rem; height: 1.25rem" />
        <h2 style="font-size: 1.125rem; font-weight: bold">All Exercises</h2>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-orange-600 ml-auto"
          style="font-weight: bold"
        >
          {{ exercises.length }} exercises
        </span>
      </div>
      <div v-if="exercises.length > 0" style="border-top: 1px solid #fed7aa">
        <div
          v-for="exercise in exercises"
          :key="exercise.id"
          style="padding: 1rem; transition: background-color 0.2s; border-left: 4px solid transparent"
          class="hover:border-orange-400"
          onmouseover="
            this.style.backgroundColor = '#fff7ed'
            this.style.borderLeftColor = '#fb923c'
          "
          onmouseout="
            this.style.backgroundColor = ''
            this.style.borderLeftColor = 'transparent'
          "
        >
          <div class="flex items-start gap-3">
            <div
              style="
                width: 2.5rem;
                height: 2.5rem;
                background: linear-gradient(to bottom right, #fb923c, #ea580c);
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              "
            >
              <Icon icon="heroicons:fire" style="width: 1.25rem; height: 1.25rem; color: white" />
            </div>
            <div style="flex: 1">
              <h3 style="font-weight: bold; color: #9a3412; font-size: 1.125rem">
                {{ exercise.name }}
              </h3>

              <p v-if="exercise.description" style="font-size: 0.875rem; color: #374151; margin-top: 0.25rem">
                {{ exercise.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        style="
          text-align: center;
          padding: 3rem 0;
          background: linear-gradient(to bottom right, #fff7ed, #ffedd5);
          border-radius: 0.5rem;
          border: 2px dashed #fdba74;
        "
      >
        <div
          style="
            width: 5rem;
            height: 5rem;
            background: linear-gradient(to bottom right, #fb923c, #ea580c);
            border-radius: 9999px;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <Icon icon="heroicons:fire" style="width: 2.5rem; height: 2.5rem; color: white" />
        </div>

        <p style="color: #9a3412; font-weight: 500; margin-bottom: 1rem; font-size: 1.125rem">No exercises yet.</p>
        <button class="btn btn-primary btn-lg" style="font-weight: bold" @click="showAddForm = true">
          <Icon icon="heroicons:plus-circle" class="btn-icon" />
          Add your first exercise
        </button>
      </div>
    </div>
  </div>
</template>
