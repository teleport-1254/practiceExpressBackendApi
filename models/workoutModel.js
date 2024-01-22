const mongoose = require('mongoose')

const Scheme = mongoose.Schema

const workoutScheme = new Scheme({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Workout', workoutScheme)