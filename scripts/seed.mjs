import Database from 'better-sqlite3'
import { join } from 'path'

const dbPath = join(process.cwd(), 'training.db')
const db = new Database(dbPath)

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workout_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    week_number INTEGER NOT NULL DEFAULT 1,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS workout_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    day_number INTEGER NOT NULL CHECK(day_number >= 1 AND day_number <= 4),
    name TEXT,
    FOREIGN KEY (plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
    UNIQUE(plan_id, day_number)
  );

  CREATE TABLE IF NOT EXISTS workout_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_day_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    target_sets INTEGER NOT NULL DEFAULT 3,
    target_reps INTEGER NOT NULL DEFAULT 10,
    target_weight REAL DEFAULT 0,
    order_index INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (workout_day_id) REFERENCES workout_days(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS training_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_exercise_id INTEGER NOT NULL,
    date DATE NOT NULL,
    set_number INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight REAL NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workout_exercise_id) REFERENCES workout_exercises(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_training_logs_date ON training_logs(date);
  CREATE INDEX IF NOT EXISTS idx_workout_plans_active ON workout_plans(is_active);
`)

// Exercises to seed
const exercises = [
  { name: 'Assisted Dips', description: 'Chest and triceps exercise' },
  { name: 'Assisted Lat Pulldown', description: 'Back exercise' },
  { name: 'Barbell Row', description: 'Back compound exercise' },
  { name: 'Bench Press', description: 'Chest compound exercise' },
  { name: 'Bicep Curl', description: 'Bicep isolation' },
  { name: 'Cable Row', description: 'Back compound exercise' },
  { name: 'Calf Raise', description: 'Calf isolation' },
  { name: 'DB Incline Bench Press', description: 'Chest compound exercise' },
  { name: 'Deadlift', description: 'Full body compound exercise' },
  { name: 'Dips', description: 'Chest and triceps exercise' },
  { name: 'Face Pull', description: 'Rear deltoid exercise' },
  { name: 'Forearm Curl', description: 'Forearm isolation' },
  { name: 'Lat Pulldown', description: 'Back exercise' },
  { name: 'Lateral Raise', description: 'Shoulder isolation' },
  { name: 'Leg Press', description: 'Leg exercise' },
  { name: 'Machine Lateral Raise', description: 'Shoulder isolation' },
  { name: 'OH Tricep Extension', description: 'Tricep isolation' },
  { name: 'Overhead Press', description: 'Shoulder compound exercise' },
  { name: 'Pull-ups', description: 'Back and biceps exercise' },
  { name: 'Reverse Forearm curl', description: 'Forearm isolation' },
  { name: 'Romanian Deadlift', description: 'Hamstring exercise' },
  { name: 'SM Incline Bench Press', description: 'Chest compound exercise' },
  { name: 'Squat', description: 'Leg compound exercise' },
  { name: 'Streched Bicep Curl', description: 'Bicep isolation' },
  { name: 'Supported Chest Row', description: 'Back compound exercise' },
  { name: 'Tricep Extension', description: 'Tricep isolation' }
]

const stmt = db.prepare('INSERT OR IGNORE INTO exercises (name, description) VALUES (?, ?)')

exercises.forEach(exercise => {
  stmt.run(exercise.name, exercise.description)
})

console.log(`✅ Seeded ${exercises.length} exercises`)

db.close()
