const Player = require('../Models/Player');

exports.UpdateScore = async (req, res) => {
    try {
        const playerId = req.params.id;
        let { matchScore, wicketsTaken, result } = req.body;

        // Convert matchScore and wicketsTaken to numbers if they are provided as strings
        matchScore = parseInt(matchScore, 10);
        wicketsTaken = parseInt(wicketsTaken, 10);

        if (isNaN(matchScore) || isNaN(wicketsTaken) || result === undefined || result === null) {
            return res.status(400).json({ error: 'Match score, wickets taken, and result are required' });
        }

        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        // Rest of your code remains unchanged
        player.totalmatch += 1;
        player.totalScore += matchScore;
        player.total16s += (matchScore >= 16 && matchScore <32) ? 1 : 0;
        player.total32s += (matchScore >= 32) ? 1 : 0;
        player.scoreAverage = player.totalScore/player.totalmatch;
        player.totalDuckouts += (matchScore === 0) ? 1 : 0;
        player.totalWicketsTaken += wicketsTaken;
        player.wicketAverage = player.totalWicketsTaken/player.totalmatch;
        // Update season-based data
        player.totalmatchSeason += 1;
        player.totalScoreSeason += matchScore;
        player.total16sSeason += (matchScore >= 16 && matchScore <32 ) ? 1 : 0;
        player.total32sSeason += (matchScore >= 32) ? 1 : 0;
        player.scoreAverageSeason = player.totalScoreSeason/player.totalmatchSeason;
        player.totalWicketsTakenSeason += wicketsTaken;
        player.wicketAverageSeason = player.totalWicketsTakenSeason/player.totalmatchSeason;
       // Update based on match result
       if (result === "WIN") {
           player.totalmatchwin += 1;
           player.totalmatchwinSeason += 1;
       } else if (result === "DRAW") {
           player.totalmatchdraw += 1;
           player.totalmatchdrawSeason += 1;
       } else if (result === "LOSE") {
           player.totalmatchlose += 1;
           player.totalmatchloseSeason += 1;
       }
       // Update MaxScoreinonematch if applicable
       if (matchScore > player.maxscoreinonematch) {
           player.maxscoreinonematch = matchScore;
       }
        // Save the updated player data
        await player.save();

        return res.status(200).json({ message: 'Player data updated successfully', player });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.newSeasonallPlayer = async (req, res) => {
    try {
        // Find all players
        const players = await Player.find();
        // Reset season-based fields to zero for each player
        players.forEach(async (player) => {
            player.totalmatchSeason = 0;
            player.totalScoreSeason = 0;
            player.total16sSeason = 0;
            player.total32sSeason = 0;
            player.scoreAverageSeason = 0;
            player.totalWicketsTakenSeason = 0;
            player.wicketAverageSeason = 0;
            player.maxscoreinonematch = 0;
            player.totalmatchwinSeason = 0;
            player.totalmatchdrawSeason = 0;
            player.totalmatchloseSeason = 0;
            // Save the updated player data
            await player.save();
        });
        return res.status(200).json({ message: 'Season data reset successfully for all players' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.resettodefault = async (req, res) => {
    try {
        // Find all players
        const players = await Player.find();

        // Reset all player fields to default values
        players.forEach(async (player) => {
            player.totalmatch = 0;
            player.totalmatchSeason = 0;
            player.totalScore = 0;
            player.totalScoreSeason = 0;
            player.total16s = 0;
            player.total16sSeason = 0;
            player.total32s = 0;
            player.total32sSeason = 0;
            player.scoreAverage = 0;
            player.scoreAverageSeason = 0;
            player.totalDuckouts = 0;
            player.totalWicketsTaken = 0;
            player.totalWicketsTakenSeason = 0;
            player.wicketAverage = 0;
            player.wicketAverageSeason = 0;
            player.totalmatchwin = 0;
            player.totalmatchdraw = 0;
            player.totalmatchlose = 0;
            player.totalmatchwinSeason = 0;
            player.totalmatchdrawSeason = 0;
            player.totalmatchloseSeason = 0;
            player.maxscoreinonematch = 0;

            // Save the updated player data
            await player.save();
        });

        return res.status(200).json({ message: 'Player data reset to default values successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deletePlayer = async (req, res) => {
    try {
        const playerId = req.params.id;

        // Find and remove the player by ID
        const deletedPlayer = await Player.findByIdAndDelete(playerId);

        if (!deletedPlayer) {
            return res.status(404).json({ error: 'Player not found' });
        }

        return res.status(200).json({ message: 'Player deleted successfully', deletedPlayer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersbasedontotalmatch = async (req, res) => {
    try {
        // Find all players and sort them by totalmatch in descending order
        const rankedPlayers = await Player.find().sort({ totalmatch: -1 });

        return res.status(200).json({ message: 'Players ranked successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalScore = async (req, res) => {
    try {
        // Find all players and sort them by totalScore in descending order
        const rankedPlayers = await Player.find().sort({ totalScore: -1 });

        return res.status(200).json({ message: 'Players ranked by totalScore successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotal16s = async (req, res) => {
    try {
        // Find all players and sort them by total16s in descending order
        const rankedPlayers = await Player.find().sort({ total16s: -1 });

        return res.status(200).json({ message: 'Players ranked by total16s successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotal32s = async (req, res) => {
    try {
        // Find all players and sort them by total32s in descending order
        const rankedPlayers = await Player.find().sort({ total32s: -1 });

        return res.status(200).json({ message: 'Players ranked by total32s successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByScoreAverage = async (req, res) => {
    try {
        // Find all players and sort them by scoreAverage in descending order
        const rankedPlayers = await Player.find().sort({ scoreAverage: -1 });

        return res.status(200).json({ message: 'Players ranked by scoreAverage successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalDuckouts = async (req, res) => {
    try {
        // Find all players and sort them by totalDuckouts in descending order
        const rankedPlayers = await Player.find().sort({ totalDuckouts: -1 });

        return res.status(200).json({ message: 'Players ranked by totalDuckouts successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalWicketsTaken = async (req, res) => {
    try {
        // Find all players and sort them by totalWicketsTaken in descending order
        const rankedPlayers = await Player.find().sort({ totalWicketsTaken: -1 });

        return res.status(200).json({ message: 'Players ranked by totalWicketsTaken successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByWicketAverage = async (req, res) => {
    try {
        // Find all players and sort them by wicketAverage in descending order
        const rankedPlayers = await Player.find().sort({ wicketAverage: -1 });

        return res.status(200).json({ message: 'Players ranked by wicketAverage successfully', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalMatchSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ totalmatchSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by totalmatchSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalScoreSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ totalScoreSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by totalScoreSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotal16sSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ total16sSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by total16sSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotal32sSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ total32sSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by total32sSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByScoreAverageSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ scoreAverageSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by scoreAverageSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByTotalWicketsTakenSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ totalWicketsTakenSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by totalWicketsTakenSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.rankPlayersByWicketAverageSeason = async (req, res) => {
    try {
        const rankedPlayers = await Player.find().sort({ wicketAverageSeason: -1 });
        return res.status(200).json({ message: 'Players ranked by wicketAverageSeason', rankedPlayers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.Playerwithmosttotalscore = async (req, res) => {
    try {
        // Find the player with the highest totalScore
        const playerWithMostTotalScore = await Player.findOne().sort({ totalScore: -1 }).limit(1);

        if (!playerWithMostTotalScore) {
            return res.status(404).json({ error: 'No player found' });
        }

        return res.status(200).json({ message: 'Player with the most total score found', player: playerWithMostTotalScore });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.Playerwithmosttotalscorebyseason = async (req, res) => {
    try {
        // Find the player with the highest totalScoreSeason
        const playerWithMostTotalScoreSeason = await Player.findOne().sort({ totalScoreSeason: -1 }).limit(1);

        if (!playerWithMostTotalScoreSeason) {
            return res.status(404).json({ error: 'No player found' });
        }

        return res.status(200).json({ message: 'Player with the most total score by season found', player: playerWithMostTotalScoreSeason });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.Playerwithmosttotalwickets = async (req, res) => {
    try {
        // Find the player with the highest totalWicketsTaken
        const playerWithMostTotalWickets = await Player.findOne().sort({ totalWicketsTaken: -1 }).limit(1);

        if (!playerWithMostTotalWickets) {
            return res.status(404).json({ error: 'No player found' });
        }

        return res.status(200).json({ message: 'Player with the most total wickets found', player: playerWithMostTotalWickets });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.Playerwithmosttotalwicketsbyseason = async (req, res) => {
    try {
        // Find the player with the highest totalWicketsTakenSeason
        const playerWithMostTotalWicketsSeason = await Player.findOne().sort({ totalWicketsTakenSeason: -1 }).limit(1);

        if (!playerWithMostTotalWicketsSeason) {
            return res.status(404).json({ error: 'No player found' });
        }

        return res.status(200).json({ message: 'Player with the most total wickets by season found', player: playerWithMostTotalWicketsSeason });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllPlayers = async (req, res) => {
    try {
        // Find all players with a role other than "Admin"
        const allPlayers = await Player.find({ role: { $ne: 'Admin' } });

        // Extract usernames and IDs from allPlayers array
        const playerData = allPlayers.map(player => ({ id: player._id, username: player.username }));

        return res.status(200).json({ message: 'All player data retrieved successfully', players: playerData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getPlayerById = async (req, res) => {
    try {
        // Extract player ID from request parameters
        const playerId = req.params.id;

        // Find the player by ID
        const player = await Player.findById(playerId);

        // Check if the player exists
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        // Return full player data
        return res.status(200).json({ message: 'Player data retrieved successfully', player });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};