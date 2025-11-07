export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  
  // Deactivate current active plan
  db.prepare('UPDATE workout_plans SET is_active = 0 WHERE is_active = 1').run()
  
  // Create new plan
  const planStmt = db.prepare(`
    INSERT INTO workout_plans (week_number, start_date, is_active) 
    VALUES (?, ?, 1)
  `)
  const planResult = planStmt.run(body.week_number || 1, body.start_date || new Date().toISOString().split('T')[0])
  const planId = planResult.lastInsertRowid
  
  // Create 4 workout days
  const dayStmt = db.prepare('INSERT INTO workout_days (plan_id, day_number, name) VALUES (?, ?, ?)')
  for (let i = 1; i <= 4; i++) {
    dayStmt.run(planId, i, `Day ${i}`)
  }
  
  return { id: planId, week_number: body.week_number || 1, start_date: body.start_date }
})
