export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  
  // Get current active plan
  const currentPlan: any = db.prepare(`
    SELECT * FROM workout_plans 
    WHERE is_active = 1 
    ORDER BY created_at DESC 
    LIMIT 1
  `).get()
  
  if (!currentPlan) {
    throw createError({ statusCode: 404, message: 'No active plan found' })
  }
  
  // Deactivate current plan
  db.prepare('UPDATE workout_plans SET is_active = 0, end_date = ? WHERE id = ?')
    .run(new Date().toISOString().split('T')[0], currentPlan.id)
  
  // Create new plan with incremented week
  const newPlanStmt = db.prepare(`
    INSERT INTO workout_plans (week_number, start_date, is_active) 
    VALUES (?, ?, 1)
  `)
  const newPlanResult = newPlanStmt.run(
    currentPlan.week_number + 1, 
    new Date().toISOString().split('T')[0]
  )
  const newPlanId = newPlanResult.lastInsertRowid
  
  // Copy workout days and exercises with progression
  const days: any[] = db.prepare('SELECT * FROM workout_days WHERE plan_id = ?').all(currentPlan.id)
  
  for (const day of days) {
    const newDayResult = db.prepare('INSERT INTO workout_days (plan_id, day_number, name) VALUES (?, ?, ?)')
      .run(newPlanId, day.day_number, day.name)
    const newDayId = newDayResult.lastInsertRowid
    
    // Copy exercises with progression
    const exercises: any[] = db.prepare('SELECT * FROM workout_exercises WHERE workout_day_id = ?').all(day.id)
    
    for (const exercise of exercises) {
      let newSets = exercise.target_sets
      let newReps = exercise.target_reps
      let newWeight = exercise.target_weight
      
      // Apply progression based on body parameters or default logic
      if (body.progression_type === 'reps') {
        newReps += body.increment || 1
      } else if (body.progression_type === 'sets') {
        newSets += body.increment || 1
      } else if (body.progression_type === 'weight') {
        newWeight += body.increment || 2.5
      } else {
        // Default: increase reps if under 12, otherwise increase weight
        if (newReps < 12) {
          newReps += 1
        } else {
          newWeight += 2.5
          newReps = 8 // Reset to lower reps with higher weight
        }
      }
      
      db.prepare(`
        INSERT INTO workout_exercises 
        (workout_day_id, exercise_id, target_sets, target_reps, target_weight, order_index) 
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(newDayId, exercise.exercise_id, newSets, newReps, newWeight, exercise.order_index)
    }
  }
  
  return { 
    id: newPlanId, 
    week_number: currentPlan.week_number + 1,
    message: 'Plan progressed successfully'
  }
})
