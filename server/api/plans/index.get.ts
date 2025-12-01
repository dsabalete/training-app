export default defineEventHandler(event => {
  const db = getDb()

  const plans = db
    .prepare(
      `
    SELECT id, week_number, start_date, end_date, is_active, created_at
    FROM workout_plans 
    ORDER BY week_number DESC
  `
    )
    .all()

  return plans
})
