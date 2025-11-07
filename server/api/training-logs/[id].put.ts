export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)
  const db = getDb()
  
  const stmt = db.prepare(`
    UPDATE training_logs 
    SET reps = ?, weight = ?, date = ?, notes = ?
    WHERE id = ?
  `)
  
  stmt.run(
    body.reps,
    body.weight,
    body.date,
    body.notes || null,
    id
  )
  
  const updated = db.prepare('SELECT * FROM training_logs WHERE id = ?').get(id)
  return updated
})

