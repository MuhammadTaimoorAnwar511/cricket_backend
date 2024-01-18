const express = require('express');
const router = express.Router();
const AuthController = require('../Controller/Authentication');
const PlayerController = require('../Controller/Player');
//app.use('/player', UserRouter);
router.post('/signup', AuthController.signup);//done
router.post('/login', AuthController.login);//done
router.post('/updateScore/:id', PlayerController.UpdateScore);//done
router.post('/newSeasonallPlayer', PlayerController.newSeasonallPlayer);//done
router.post('/resettodefault', PlayerController.resettodefault);//done
router.delete('/deletePlayer/:id', PlayerController.deletePlayer); 
router.get('/rankPlayersbasedontotalmatch', PlayerController.rankPlayersbasedontotalmatch);//done
router.get('/rankPlayersByTotalScore', PlayerController.rankPlayersByTotalScore);//done
router.get('/rankPlayersByTotal16s', PlayerController.rankPlayersByTotal16s);//done
router.get('/rankPlayersByTotal32s', PlayerController.rankPlayersByTotal32s);//done
router.get('/rankPlayersByScoreAverage', PlayerController.rankPlayersByScoreAverage);//done
router.get('/rankPlayersByTotalDuckouts', PlayerController.rankPlayersByTotalDuckouts);//done
router.get('/rankPlayersByTotalWicketsTaken', PlayerController.rankPlayersByTotalWicketsTaken);//DONE
router.get('/rankPlayersByWicketAverage', PlayerController.rankPlayersByWicketAverage);//DONE
router.get('/rankPlayersByTotalMatchSeason', PlayerController.rankPlayersByTotalMatchSeason);
router.get('/rankPlayersByTotalScoreSeason', PlayerController.rankPlayersByTotalScoreSeason);//DONE
router.get('/rankPlayersByTotal16sSeason', PlayerController.rankPlayersByTotal16sSeason);//DONE
router.get('/rankPlayersByTotal32sSeason', PlayerController.rankPlayersByTotal32sSeason);//DONE
router.get('/rankPlayersByScoreAverageSeason', PlayerController.rankPlayersByScoreAverageSeason);//DONE
router.get('/rankPlayersByTotalWicketsTakenSeason', PlayerController.rankPlayersByTotalWicketsTakenSeason);//DONE
router.get('/rankPlayersByWicketAverageSeason', PlayerController.rankPlayersByWicketAverageSeason);//DONE
router.get('/playerwith-most-totalscore', PlayerController.Playerwithmosttotalscore);//done
router.get('/playerwith-most-totalscore-byseason', PlayerController.Playerwithmosttotalscorebyseason);
router.get('/playerwith-most-totalwickets', PlayerController.Playerwithmosttotalwickets);//DONE
router.get('/playerwith-most-totalwickets-byseason', PlayerController.Playerwithmosttotalwicketsbyseason);//done
router.get('/allplayers', PlayerController.getAllPlayers);//done
router.get('/PlayerById/:id', PlayerController.getPlayerById);//done
module.exports = router;