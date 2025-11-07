# Gym Training Tracker

A full-stack web application to track your gym training progress with a 4-day weekly workout plan.

## Features

- **4-Day Workout Plan**: Organize your training into 4 days per week
- **Exercise Library**: Manage a library of exercises with descriptions
- **Customizable Workouts**: Choose which exercises to do each day with custom sets, reps, and weight
- **Training Logs**: Record your actual performance for each set
- **Weekly Progression**: Automatically progress your plan weekly with increased targets
- **Progression Options**:
  - Increase reps
  - Increase sets
  - Increase weight
  - Auto progression (default): increases reps until 12, then increases weight and resets reps

## Tech Stack

- **Frontend**: Nuxt 4 (Vue 3)
- **Styling**: Tailwind CSS
- **Database**: SQLite with better-sqlite3
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Seed the database with sample exercises:
```bash
node scripts/seed.mjs
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Usage

### Creating Your First Plan

1. Click "Create Plan" on the home page
2. This creates a new 4-day workout plan (Week 1)

### Adding Exercises to Your Plan

1. On each day card, click "+ Add Exercise"
2. Select an exercise from the dropdown
3. Set target sets, reps, and weight
4. Click "Add"

### Logging Your Workouts

1. Click "Log" on any exercise
2. Enter the actual reps and weight for each set
3. Click "Save Sets"

### Progressing Your Plan

When you're ready to move to the next week:

1. Click "Progress to Week X" button
2. The app will create a new plan with increased targets based on the progression logic
3. Your old plan is archived but not deleted

## Database Schema

- **exercises**: Exercise library
- **workout_plans**: Weekly workout plans
- **workout_days**: 4 days per plan
- **workout_exercises**: Exercises assigned to each day with targets
- **training_logs**: Actual performance logs

## Building for Production

```bash
npm run build
npm run preview
```

## Future Enhancements

- Progress tracking charts and analytics
- Exercise history and personal records
- Rest timer
- Exercise video/image support
- Multiple active plans for different goals
- Export/import workout plans

## License

MIT
