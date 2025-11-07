export default defineEventHandler(() => {
  const db = getDb()
  const exercises = db.prepare('SELECT * FROM exercises ORDER BY name').all()
  return exercises
})
