class GameMechanincs {
    constructor() {
        // 1 -> yellow
        // 2 -> red

        this._players = ["Yellow", "Red"];

        this._board = this.generateBoard();
        this._columnHeight = [5, 5, 5, 5, 5, 5, 5];

        this._turns = 0; // 0 is initital state; yellow takes odd turns and red takes even turns
        this._currentPlayer = 1; // can have value 1 or 2
    }

    // methods related to board operations

    generateBoard = () => {
        let row = new Array(6);
        for (let i = 0; i < 6; i++) {
            row[i] = new Array(7).fill(0);
        }

        return row;
    };

    getBoard = () => {
        return this._board;
    };

    resetBoard = () => {
        this._board = this.generateBoard();
        this._turns = 0;
        this._currentPlayer = 1;
        this._columnHeight = [5, 5, 5, 5, 5, 5, 5];
    };

    // methods related to game turns

    updatePlayer = () => {
        this._currentPlayer = this._currentPlayer + 1;

        if (this._currentPlayer > 2) {
            this._currentPlayer = 1;
        }
    };

    makeMove = (columnId) => {
        this._board[this._columnHeight[columnId]][
            columnId
        ] = this._currentPlayer;
    };

    updateTurn = () => {
        this._turns = this._turns + 1;
    };

    updateHeight = (columnId) => {
        this._columnHeight[columnId] = this._columnHeight[columnId] - 1;
    };

    findWinner = (columnId) => {
        const horizontalCount = this.horizontalLength(columnId);

        if (horizontalCount) {
            return horizontalCount;
        }

        const verticalCount = this.verticalLength(columnId);

        if (verticalCount) {
            return verticalCount;
        }

        const leftDiagonalCount = this.leftDiagonalLength(columnId);
        if (leftDiagonalCount) {
            return leftDiagonalCount;
        }

        const rightDiagonalCount = this.rightDiagonalLength(columnId);
        if (rightDiagonalCount) {
            return rightDiagonalCount;
        }

        return 0;
    };

    // utility methods

    // id between (0..6)
    // coin cannot be dropped in a full column
    validateTurn = (columnId) => {
        // if input is not a number or not an integer
        if (Number.isNaN(columnId) && !Number.isInteger(columnId)) {
            return false;
        }

        // if columnId is out of bounds
        if (columnId < 0 && columnId > 6) {
            return false;
        }

        // if column is full
        if (this._columnHeight[columnId] === 0) {
            return false;
        }

        return true;
    };

    getPlayer = (id) => {
        return this._players[id - 1];
    };

    getHeights = () => {
        return this._columnHeight;
    };

    horizontalLength = (columnId) => {
        // take the current player and the current move
        const currentPlayer = this._currentPlayer;
        const columnHeight = this._columnHeight[columnId];

        // check left and right
        let horizontalCount = 0;
        let currentHorizontalCount = 0;

        for (let i = 0; i < 7; i++) {
            if (this._board[columnHeight][i] === currentPlayer) {
                currentHorizontalCount = currentHorizontalCount + 1;
            } else {
                currentHorizontalCount = 0;
            }

            if (currentHorizontalCount > horizontalCount) {
                horizontalCount = currentHorizontalCount;
            }
        }

        if (horizontalCount >= 4) {
            return currentPlayer;
        } else {
            return 0;
        }
    };

    verticalLength = (columnId) => {
        // take the current player and the current move
        const currentPlayer = this._currentPlayer;
        const columnHeight = this._columnHeight[columnId];

        // check top and bottom
        let verticalCount = 0;
        let currentVerticalCount = 0;

        for (let i = 0; i < 6; i++) {
            if (this._board[i][columnId] === currentPlayer) {
                currentVerticalCount = currentVerticalCount + 1;
            } else {
                currentVerticalCount = 0;
            }

            if (currentVerticalCount > verticalCount) {
                verticalCount = currentVerticalCount;
            }
        }

        if (verticalCount >= 4) {
            return currentPlayer;
        } else {
            return 0;
        }
    };

    leftDiagonalLength = (columnId) => {
        // take the current player and the current move
        const currentPlayer = this._currentPlayer;
        const columnHeight = this._columnHeight[columnId];

        // top-left to bottom-right - bottom half
        for (let i = 0; i < 2; i++) {
            let count = 0;
            let row, col;
            for (row = i, col = 0; row < 6 && col < 7; row++, col++) {
                if (this._board[row][col] === currentPlayer) {
                    count = count + 1;
                    if (count >= 4) {
                        return currentPlayer;
                    }
                } else {
                    count = 0;
                }
            }
        }

        // top-left to bottom-right - top half
        for (let j = 1; j < 3; j++) {
            let count = 0;
            let row, col;
            for (row = 0, col = j; row < 6 && col < 7; row++, col++) {
                if (this._board[row][col] === currentPlayer) {
                    count = count + 1;
                    if (count >= 4) {
                        return currentPlayer;
                    }
                } else {
                    count = 0;
                }
            }
        }

        return 0;
    };

    rightDiagonalLength = (columnId) => {
        // take the current player and the current move
        const currentPlayer = this._currentPlayer;
        const columnHeight = this._columnHeight[columnId];

        // bottom left to top-right - top half
        for (let i = 5; i >= 3; i--) {
            let count = 0;
            let row, col;
            for (row = i, col = 0; row >= 0 && col < 7; row--, col++) {
                if (this._board[row][col] === currentPlayer) {
                    count = count + 1;
                    if (count >= 4) {
                        return currentPlayer;
                    }
                } else {
                    count = 0;
                }
            }
        }

        // top-right to bottom-left - bottom half
        for (let j = 6; j >= 3; j--) {
            let count = 0;
            let row, col;
            for (row = 0, col = j; row < 6 && col >= 0; row++, col--) {
                if (this._board[row][col] === currentPlayer) {
                    count = count + 1;
                    if (count >= 4) {
                        return currentPlayer;
                    }
                } else {
                    count = 0;
                }
            }
        }

        return 0;
    };
}

module.exports.GameMechanincs = GameMechanincs;
