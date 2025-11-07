export default defineEventHandler((event) => {
  const query = getQuery(event)
  const workoutExerciseId = query.workout_exercise_id as string
  const date = query.date as string
  
  if (!workoutExerciseId || !date) {
    throw createError({ statusCode: 400, message: 'workout_exercise_id and date are required' })
  }
  
  const db = getDb()
  
  const logs = db.prepare(`
    SELECT * FROM training_logs 
    WHERE workout_exercise_id = ? AND date = ?
    ORDER BY set_number ASC
  `).all(workoutExerciseId, date)
  
  return logs
})

