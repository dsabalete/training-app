export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const db = getDb()
  
  const stmt = db.prepare(`
    UPDATE workout_exercises 
    SET target_sets = ?, target_reps = ?, target_weight = ?
    WHERE id = ?
  `)
  
  stmt.run(body.target_sets, body.target_reps, body.target_weight, id)
  
  return { id, ...body }
})
