export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  const db = getDb()

  db.prepare('DELETE FROM workout_exercises WHERE id = ?').run(id)

  return { success: true }
})
