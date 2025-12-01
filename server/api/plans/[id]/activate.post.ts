export default defineEventHandler(async event => {
  const db = getDb()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Plan ID is required',
    })
  }

  // First, deactivate all plans
  db.prepare('UPDATE workout_plans SET is_active = 0').run()

  // Then activate the selected plan
  const result = db.prepare('UPDATE workout_plans SET is_active = 1 WHERE id = ?').run(id)

  if (result.changes === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Plan not found',
    })
  }

  return { success: true }
})
