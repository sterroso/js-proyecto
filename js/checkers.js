// Clase tablero
class Board {
    cells = {
        0: 'disabled',  1: null,        2: 'disabled',  3: null,        4: 'disabled',  5: null,        6: 'disabled',  7: null,
        8: null,        9: 'disabled',  10: null,       11: 'disabled', 12: null,       13: 'disabled', 14: null,       15: 'disabled',
        16: 'disabled', 17: null,       18: 'disabled', 19: null,       0: 'disabled',  21: null,       22: 'disabled', 23: null,
        24: null,       25: 'disabled', 26: null,       27: 'disabled', 28: null,       29: 'disabled', 30: null,       31: 'disabled',
        32: 'disabled', 33: null,       34: 'disabled', 35: null,       36: 'disabled', 37: null,       38: 'disabled', 39: null,
        40: null,       41: 'disabled', 42: null,       43: 'disabled', 44: null,       45: 'disabled', 46: null,       47: 'disabled',
        48: 'disabled', 49: null,       50: 'disabled', 51: null,       52: 'disabled', 53: null,       54: 'disabled', 55: null,
        56: null,       57: 'disabled', 58: null,       59: 'disabled', 60: null,       61: 'disabled', 62: null,       63: 'disabled'
    }

    validMoves = {
        0: null,
        1: [8, 10, 19, 28, 37, 46, 55],
        2: null,
        3: [10, 12, 17, 21, 24, 30, 39],
        4: null,
        5: [12, 14, 19, 23, 26, 33, 40],
        6: null,
        7: [14, 21, 28, 35, 42, 49, 56],
        8: [1, 17, 26, 35, 44, 53, 62],
        9: null,
        10: [1, 3, 17, 19, 24, 28, 37, 46, 55],
        11: null,
        12: [3, 5, 19, 21, 26, 30, 33, 39, 40],
        13: null,
        14: [5, 7, 21, 23, 28, 35, 42, 49, 56],
        15: null,
        16: null,
        17: [3, 8, 10, 24, 26, 35, 44, 53, 62],
        18: null,
        19: [1, 5, 10, 12, 26, 28, 33, 37, 40, 46, 55],
        20: null,
        21: [3, 7, 12, 14, 28, 30, 35, 39, 42, 49, 56],
        22: null,
        23: [5, 14, 30, 37, 44, 51, 58],
        24: [3, 10, 17, 33, 42, 51, 60],
        25: null,
        26: [],
        27: null,
        28: [],
        29: null,
        30: [],
        31: null,
        32: null,
        33: [],
        34: null,
        35: [],
        36: null,
        37: [],
        38: null,
        39: [],
        40: [],
        41: null,
        42: [],
        43: null,
        44: [],
        45: null,
        46: [],
        47: null,
        48: null,
        49: [],
        50: null,
        51: [],
        52: null,
        53: [],
        54: null,
        55: [],
        56: [],
        57: null,
        58: [],
        59: null,
        60: [],
        61: null,
        62: [],
        63: null
    }

    constructor() {
        return false;
    }
}


// Clase ficha
class Token {
    constructor(color, isKing = false) {
        this.color = color;
        this.isKing = isKing;

        return false;
    }
}

// Clase Cell (celda del tablero)
class Cell {
    static #MIN_CELL_NUMBER = 0;
    static #MAX_CELL_NUMBER = 63;

    constructor(cellNumber) {
        this.cellNumber = cellNumber;

        return false;
    }

    //
    isEmpty() {
        return this.token === null;
    }

    set token(token) {
        if (this.isEmpty) {
            this.token = token;
            return true;
        }

        return false;
    }

    get token() {
        return this.token;
    }

    set cellNumber(cellNumber) {
        if (cellNumber >= Cell.#MIN_CELL_NUMBER && cellNumber <= Cell.#MAX_CELL_NUMBER) {
            this.cellNumber = cellNumber;
            return true;
        }

        return false;
    }

    get cellNumber() {
        return this.cellNumber;
    }

    clear() {
        this.token = null;
    }
}

// Claje Player (jugador)
class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        return false;
    }
}