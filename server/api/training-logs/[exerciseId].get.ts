export default defineEventHandler((event) => {
  const exerciseId = getRouterParam(event, 'exerciseId')
  const db = getDb()
  
  const logs = db.prepare(`
    SELECT * FROM training_logs 
    WHERE workout_exercise_id = ? 
    ORDER BY date DESC, set_number ASC
  `).all(exerciseId)
  
  return logs
})
