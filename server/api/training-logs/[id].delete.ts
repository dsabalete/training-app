export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const db = getDb()
  
  db.prepare('DELETE FROM training_logs WHERE id = ?').run(id)
  
  return { success: true, id }
})

