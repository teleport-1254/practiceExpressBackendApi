const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// required auth for access to all workouts
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET a single workouts
router.get('/:id', getWorkout)

// POST a new workouts
router.post('/', createWorkout)

// DELETE a workouts
router.delete('/:id', deleteWorkout)

// UPDATE a workouts
router.patch('/:id', updateWorkout)

module.exports = router