/**
 * this module has the following routes
 * /api/start                              -> GET                   -> resets current state and starts a new game
 * /api/:columnId                          -> PUT                   -> for a valid move, (0..6), updates the state with the new move
 */

// package imports
const express = require("express");
const router = express.Router();

// module imports
const GameMechanics = require("./mechanics").GameMechanincs;

// initialize game
const gameMechanics = new GameMechanics();

/**
 * /api/start  -> GET
 * starts a new game
 *
 * returns "READY" after resetting the game state
 */
router.get("/start", async (req, res) => {
    gameMechanics.resetBoard();
    res.status(200).send("READY");
});

/**
 * /api/:columnId   -> PUT
 * takes a columnId as a move, validates it,
 * if valid, the turn is played,
 * otherwise waits for a valid move
 */
router.put("/:columnId", async (req, res) => {
    // validating columnId
    if (!gameMechanics.validateTurn(req.params.columnId)) {
        return res.status(400);
    }

    const columnId = req.params.columnId;

    gameMechanics.makeMove(columnId);

    const winner = gameMechanics.findWinner(columnId);

    if (winner) {
        return res
            .status(200)
            .send(gameMechanics.getPlayer(winner) + " is the winner!");
    }

    gameMechanics.updateHeight(columnId);
    gameMechanics.updatePlayer(columnId);

    return res.status(200).send(gameMechanics.getBoard());
});

module.exports = router;
