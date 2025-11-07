export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  
  const stmt = db.prepare(`
    INSERT INTO training_logs 
    (workout_exercise_id, date, set_number, reps, weight, notes) 
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    body.workout_exercise_id,
    body.date || new Date().toISOString().split('T')[0],
    body.set_number,
    body.reps,
    body.weight,
    body.notes || null
  )
  
  return { id: result.lastInsertRowid, ...body }
})
