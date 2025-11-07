export default defineEventHandler(() => {
  const db = getDb()
  
  const plan = db.prepare(`
    SELECT * FROM workout_plans 
    WHERE is_active = 1 
    ORDER BY created_at DESC 
    LIMIT 1
  `).get()
  
  if (!plan) {
    return null
  }
  
  const days = db.prepare(`
    SELECT wd.*, 
           json_group_array(
             json_object(
               'id', we.id,
               'exercise_id', we.exercise_id,
               'exercise_name', e.name,
               'target_sets', we.target_sets,
               'target_reps', we.target_reps,
               'target_weight', we.target_weight,
               'order_index', we.order_index
             )
           ) as exercises
    FROM workout_days wd
    LEFT JOIN workout_exercises we ON wd.id = we.workout_day_id
    LEFT JOIN exercises e ON we.exercise_id = e.id
    WHERE wd.plan_id = ?
    GROUP BY wd.id
    ORDER BY wd.day_number
  `).all(plan.id)
  
  return {
    ...plan,
    days: days.map(day => ({
      ...day,
      exercises: JSON.parse(day.exercises).filter((e: any) => e.id !== null)
    }))
  }
})
