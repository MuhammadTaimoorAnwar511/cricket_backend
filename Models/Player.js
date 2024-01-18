const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Player', 'Admin'],
        default: 'Player',
    },
    totalmatch: {
        type: Number,
        default: 0,
    },
    totalmatchSeason: {
        type: Number,
        default: 0,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    totalScoreSeason: {
        type: Number,
        default: 0,
    },
    total16s: {
        type: Number,
        default: 0,
    },
    total16sSeason: {
        type: Number,
        default: 0,
    },
    total32s: {
        type: Number,
        default: 0,
    },
    total32sSeason: {
        type: Number,
        default: 0,
    },
    scoreAverage: {
        type: Number,
        default: 0,
    },
    scoreAverageSeason: {
        type: Number,
        default: 0,
    },
    totalDuckouts: {
        type: Number,
        default: 0,
    },
    totalWicketsTaken: {
        type: Number,
        default: 0,
    },
    totalWicketsTakenSeason: {
        type: Number,
        default: 0,
    },
    wicketAverage: {
        type: Number,
        default: 0,
    },
    wicketAverageSeason: {
        type: Number,
        default: 0,
    },
    totalmatchwin: {
        type: Number,
        default: 0,
    },
    totalmatchdraw: {
        type: Number,
        default: 0,
    },
    totalmatchlose: {
        type: Number,
        default: 0,
    },
    totalmatchwinSeason: {
        type: Number,
        default: 0,
    },
    totalmatchdrawSeason: {
        type: Number,
        default: 0,
    },
    totalmatchloseSeason: {
        type: Number,
        default: 0,
    },
    maxscoreinonematch: {
        type: Number,
        default: 0,
    },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;