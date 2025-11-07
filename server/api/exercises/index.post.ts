export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  
  const stmt = db.prepare('INSERT INTO exercises (name, description) VALUES (?, ?)')
  const result = stmt.run(body.name, body.description || null)
  
  return { id: result.lastInsertRowid, ...body }
})
