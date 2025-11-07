<script setup>
defineOptions({
  name: 'ExercisesPage'
})

const exercises = ref([])
const showAddForm = ref(false)
const newExercise = ref({
  name: '',
  description: ''
})

const toast = useToast()

onMounted(async () => {
  await loadExercises()
})

async function loadExercises() {
  const data = await $fetch('/api/exercises')
  exercises.value = data
}

async function addExercise() {
  if (!newExercise.value.name) {
    toast.add({ title: 'Please enter an exercise name', color: 'red' })
    return
  }

  await $fetch('/api/exercises', {
    method: 'POST',
    body: newExercise.value
  })

  newExercise.value = { name: '', description: '' }
  showAddForm.value = false
  await loadExercises()
  toast.add({ title: 'Exercise added successfully!', color: 'green' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-3">
        <div style="width: 0.25rem; height: 3rem; background: linear-gradient(to bottom, #f97316, #ea580c); border-radius: 9999px;"></div>
        <h1 style="font-size: 2.25rem; font-weight: bold; background: linear-gradient(to right, #ea580c, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
          Exercise Library
        </h1>
      </div>
      <UButton
        label="Add Exercise"
        color="primary"
        size="lg"
        icon="i-heroicons-plus-circle"
        style="font-weight: bold;"
        @click="showAddForm = true"
      />
    </div>

    <UCard v-if="showAddForm" style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed);">
      <template #header>
        <div style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
          <h2 style="font-size: 1.125rem; font-weight: bold;">Add New Exercise</h2>
        </div>
      </template>

      <div class="space-y-4" style="padding-top: 1rem;">
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <UIcon name="i-heroicons-fire" class="w-4 h-4" style="color: #f97316;" />
            Exercise Name <span style="color: #ef4444;">*</span>
          </label>
          <UInput
            v-model="newExercise.name"
            type="text"
            placeholder="e.g., Bench Press"
            icon="i-heroicons-fire"
            color="primary"
          />
        </div>
        <div>
          <label style="display: block; font-size: 0.875rem; font-weight: 600; color: #9a3412; margin-bottom: 0.5rem;">Description (optional)</label>
          <UTextarea
            v-model="newExercise.description"
            placeholder="Exercise notes or instructions"
            :rows="3"
            color="primary"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3">
          <UButton
            label="Add Exercise"
            color="primary"
            icon="i-heroicons-check"
            size="lg"
            style="font-weight: bold;"
            @click="addExercise"
          />
          <UButton
            label="Cancel"
            color="gray"
            variant="soft"
            @click="showAddForm = false"
          />
        </div>
      </template>
    </UCard>

    <UCard style="border: 2px solid #fed7aa; background: linear-gradient(to bottom right, white, #fff7ed);">
      <template #header>
        <div style="background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 1rem; margin: -1.5rem -1.5rem 0 -1.5rem; border-radius: 0.5rem 0.5rem 0 0; display: flex; align-items: center; gap: 0.5rem;">
          <UIcon name="i-heroicons-list-bullet" class="w-5 h-5" />
          <h2 style="font-size: 1.125rem; font-weight: bold;">All Exercises</h2>
          <UBadge color="white" variant="solid" style="margin-left: auto; color: #ea580c; font-weight: bold;">
            {{ exercises.length }} exercises
          </UBadge>
        </div>
      </template>

      <div v-if="exercises.length > 0" style="border-top: 1px solid #fed7aa;">
        <div
          v-for="exercise in exercises"
          :key="exercise.id"
          style="padding: 1rem; transition: background-color 0.2s; border-left: 4px solid transparent;"
          class="hover:border-orange-400"
          onmouseover="this.style.backgroundColor='#fff7ed'; this.style.borderLeftColor='#fb923c';"
          onmouseout="this.style.backgroundColor=''; this.style.borderLeftColor='transparent';"
        >
          <div class="flex items-start gap-3">
            <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(to bottom right, #fb923c, #ea580c); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <UIcon name="i-heroicons-fire" class="w-5 h-5" style="color: white;" />
            </div>
            <div style="flex: 1;">
              <h3 style="font-weight: bold; color: #9a3412; font-size: 1.125rem;">{{ exercise.name }}</h3>
              <p v-if="exercise.description" style="font-size: 0.875rem; color: #374151; margin-top: 0.25rem;">
                {{ exercise.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="text-align: center; padding: 3rem 0; background: linear-gradient(to bottom right, #fff7ed, #ffedd5); border-radius: 0.5rem; border: 2px dashed #fdba74;">
        <div style="width: 5rem; height: 5rem; background: linear-gradient(to bottom right, #fb923c, #ea580c); border-radius: 9999px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
          <UIcon name="i-heroicons-fire" class="w-10 h-10" style="color: white;" />
        </div>
        <p style="color: #9a3412; font-weight: 500; margin-bottom: 1rem; font-size: 1.125rem;">No exercises yet.</p>
        <UButton
          label="Add your first exercise"
          color="primary"
          variant="solid"
          size="lg"
          icon="i-heroicons-plus-circle"
          style="font-weight: bold;"
          @click="showAddForm = true"
        />
      </div>
    </UCard>
  </div>
</template>
