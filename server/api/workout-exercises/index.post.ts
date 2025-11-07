export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO workout_exercises 
    (workout_day_id, exercise_id, target_sets, target_reps, target_weight, order_index) 
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    body.workout_day_id,
    body.exercise_id,
    body.target_sets || 3,
    body.target_reps || 10,
    body.target_weight || 0,
    body.order_index || 0
  )
  
  return { id: result.lastInsertRowid, ...body }
})
