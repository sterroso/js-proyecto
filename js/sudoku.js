// Primero defino los elementos del juego: Celda, Tablero

/**
 * Define una celda dentro de un tablero de Sudoku.
 */
class Cell {
    // Valor mínimo de una celda.
    static #MIN_VALUE = 1;

    // Valor máximo de una celda.
    static #MAX_VALUE = 9;

    /**
     * Crea una instancia de una celda de sudoku.
     * 
     * @param {int} value El valor (1-9) inicial de la celda. Si no se proporciona un
     * valor, será nulo (null) por defecto.
     */
    constructor(value = null) {
        this._value = value;
    }

    /**
     * Establece el valor de la celda.
     * 
     * @param {int} value El valor (1-9) de la celda.
     * @returns true si el valor proporcionado es válido y fue asignado, false de
     * lo contrario.
     */
    set value(value) {
        if (value !== null && Cell.#MIN_VALUE <= value <= Cell.#MAX_VALUE) {
            this._value = value;
            return true;
        }

        return false;
    }

    /**
     * Devuelve el valor de la celda.
     * 
     * @returns El valor de la celda. Devuelve nulo (null) si no se ha establecido.
     */
    get value() {
        return this._value;
    }

    /**
     * Valida la celda (si se ha establecido un valor)
     * 
     * @returns true si se ha establecido el valor de la celda, false de lo contrario.
     */
    isValid() {
        if (this.value !== null) {
            return true;
        }

        return false;
    }

    /**
     * Devuelve el valor mínimo que puede tener una celda de Sudoku.
     * 
     * @returns El valor nímimo que puede tener una celda.
     */
    static getMinValue() {
        return Cell.#MIN_VALUE;
    }

    /**
     * Devuelve el valor máximo que puede tener una celda de Sudoku.
     * 
     * @returns El valor máximo que puede terner una celda.
     */
    static getMaxValue() {
        return Cell.#MAX_VALUE;
    }
}


class Board {
    // Número de filas.
    static #NUM_ROWS = 9;

    // Número de columnas.
    static #NUM_COLS = 9;

    // Niveles de dificultad.
    static #LEVELS = {
        // Nivel fácil
        'easy': {
            'levelName': 'Fácil',
            'minClusterEmptyCells': 0,  // Número mínimo de celdas vacías en un Cluster (3 x 3 celdas)
            'maxClusterEmptyCells': 4,  // Número máximo de celdas vacías en un Cluster (3 x 3 celdas)
            'minRowEmptyCells': 0,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 5,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 0,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 5,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel medio
        'medium': {
            'levelName': 'Medio',
            'minClusterEmptyCells': 1,  // Número mínimo de celdas vacías en un Cluster (3 x 3 celdas)
            'maxClusterEmptyCells': 6,  // Número máximo de celdas vacías en un Cluster (3 x 3 celdas)
            'minRowEmptyCells': 1,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 6,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 1,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 6,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel difícil
        'hard': {
            'levelName': 'Difícil',
            'minClusterEmptyCells': 3,  // Número mínimo de celdas vacías en un Cluster (3 x 3 celdas)
            'maxClusterEmptyCells': 9,  // Número máximo de celdas vacías en un Cluster (3 x 3 celdas)
            'minRowEmptyCells': 4,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 9,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 4,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 9,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        }
    }

    /**
     * Define un tablero de Sudoku
     * 
     * @param {string} level Nivel de dificultad del tablero.
     */
    constructor(level = 'easy') {
        this.level = level

        this._solved = false;

        this._cells = new Array(Board.#NUM_ROWS);

        for (let i = 0; i < Board.#NUM_ROWS; i++) {
            this._cells[i] = new Array(Board.#NUM_COLS);
        }

        this.#populateBoard();
    }

    /**
     * Establece el nivel de dificultad del tablero, si el valor proporcionado es 
     * válido. Si el nuevo valor es diferente al nivel de dificultad anterior, 
     * borra todo el contenido del tablero y lo vuelve a poblar.
     * 
     * @param {string} level El nuevo nivel de dificultad del tablero.
     * @returns true si el nivel de dificultad proporcionado es válido, false de lo 
     * contrario.
     */
    set level(level = 'easy') {
        if (Board.isValidLevel(level)) {
            this._level = level;

            return true;
        }

        return false;
    }

    /**
     * Devuelve el nivel de dificultad actual del tablero.
     */
    get level() {
        return this._level;
    }

    /**
     * Devuelve las celdas del tablero.
     */
    get cells() {
        return this._cells;
    }

    /**
     * Indica si el tablero de Sudoku ya está resuelto.
     * 
     * @returns true si el tablero ya está resuelto, false de lo contrario.
     */
    get solved () {
        return this._solved;
    }

    #populateBoard = () => {
        let rows = [
            [],  // Fila 0, va desde (0, 0) hasta (8, 0)
            [],  // Fila 1, va desde (0, 1) hasta (8, 1)
            [],  // Fila 2, va desde (0, 2) hasta (8, 2)
            [],  // Fila 3, va desde (0, 3) hasta (8, 3)
            [],  // Fila 4, va desde (0, 4) hasta (8, 4)
            [],  // Fila 5, va desde (0, 5) hasta (8, 5)
            [],  // Fila 6, va desde (0, 6) hasta (8, 6)
            [],  // Fila 7, va desde (0, 7) hasta (8, 7)
            []   // Fila 8, va desde (0, 8) hasta (8, 8)
        ]

        let cols = [
            [],  // Columna 0, va desde (0, 0) hasta (0, 8)
            [],  // Columna 1, va desde (1, 0) hasta (1, 8)
            [],  // Columna 2, va desde (2, 0) hasta (2, 8)
            [],  // Columna 3, va desde (3, 0) hasta (3, 8)
            [],  // Columna 4, va desde (4, 0) hasta (4, 8)
            [],  // Columna 5, va desde (5, 0) hasta (5, 8)
            [],  // Columna 6, va desde (6, 0) hasta (6, 8)
            [],  // Columna 7, va desde (7, 0) hasta (7, 8)
            []   // Columna 8, va desde (8, 0) hasta (8, 8)
        ]

        let squares = [
            [],  // Cuadro 0, va desde (0, 0) hasta (2, 2) - cuadro superior izquierdo
            [],  // Cuadro 1, va desde (3, 0) hasta (5, 2) - cuadro superior central
            [],  // Cuadro 2, va desde (6, 0) hasta (8, 2) - cuadro superior derecho
            [],  // Cuadro 3, va desde (0, 3) hasta (2, 5) - cuadro medio izquierdo
            [],  // Cuadro 4, va desde (3, 3) hasta (5, 5) - cuadro medio central
            [],  // Cuadro 5, va desde (6, 3) hasta (8, 5) - cuadro medio derecho
            [],  // Cuadro 6, va desde (0, 6) hasta (2, 8) - cuadro inferior izquierdo
            [],  // Cuadro 7, va desde (3, 6) hasta (5, 8) - cuadro inferior central
            []   // Cuadro 8, va desde (6, 6) hasta (8, 8) - cuadro inferior derecho
        ]

        let squareIndex = -1;

        let value = -1;

        for(let col = 0; col < Board.#NUM_COLS; col++) {
            for(let row = 0; row < Board.#NUM_ROWS; row++) {
                squareIndex = Board.getSquareIndex(col, row);

                do {
                    value = Math.floor(Math.random() * (Cell.getMaxValue() + 1 - Cell.getMinValue())) + Cell.getMinValue();
                } while(
                    rows[col].find(rowItem => rowItem === value) || 
                    cols[col].find(colItem => colItem === value) || 
                    squares[col].find(squareItem => squareItem === value)
                    );
                
                rows[col][row] = value;
                cols[col][row] = value;
                squares[squareIndex].push(value);
                this._cells[col][row] = new Cell(value);
            }
        }
    }

    /**
     * Devuelve una cadena de caracteres que indica el nivel de dificultad del tablero.
     * 
     * @returns Una cadena de caracteres que indica el nivel de dificultad del tablero.
     */
    toString() {
        return `Tablero de Sudoku. Nivel de dificultad: ${Board.getLevelName(this.level)}.`;
    }

    /**
     * Valida si un nivel de dificultad es válido.
     * 
     * @param {string} level El nivel de dificultad a validar.
     * @returns true si el nivel proporcionado es válido, false de lo contrario.
     */
    static isValidLevel = level => {
        if (level === null) return false;

        if (Board.getValidLevels().find(item => item === level)) {
            return true;
        }

        return false;
    }

    /**
     * Devuelve un arreglo de cadenas de caracteres con los niveles de dificultad
     * posibles para un tablero de Sudoku.
     * 
     * @returns Un arreglo con los niveles de dificultad válidos.
     */
    static getValidLevels = () => {
        return Object.keys(Board.#LEVELS);
    }

    /**
     * Devuelve el nivel de dificultad por defecto. Es el nivel de dificultad con el 
     * que se configura el tablero de Sudoku si no se proporciona un nivel de dificultad
     * válido en el constructor.
     * 
     * @returns El nivel de dificultad por defecto.
     */
    static getDefaultLevel = () => {
        return Board.getValidLevels()[0];
    }

    /**
     * Devuelve el nombre del nivel de dificultad proporcionado.
     * 
     * @param {string} level El nivel de dificultad cuyo nombre se desea saber.
     * @returns Una cadena de caracteres con el nombre del nivel de dificultad que 
     * corresponde al valor proporcionado, false si no es válido el nivel de dificultad 
     * proporcionado.
     */
    static getLevelName = level => {
        if (Board.isValidLevel(level)) {
            return Board.#LEVELS[level].levelName;
        }

        return '';
    }

    static getLevelSpecs = level => {
        if (Board.isValidLevel(level)) {
            return Board.#LEVELS[level];
        }

        return '';
    }

    static getSquareIndex = (columnIndex, rowIndex) => {
        if (0 <= columnIndex <= 2) {
            if (0 <= rowIndex <= 2) {
                return 0;
            }

            if (3 <= rowIndex <= 5) {
                return 1;
            }

            if (6 <= rowIndex <= 8) {
                return 2;
            }
        }

        if (3 <= columnIndex <= 5) {
            if (0 <= rowIndex <= 2) {
                return 3;
            }

            if (3 <= rowIndex <= 5) {
                return 4;
            }

            if (6 <= rowIndex <= 8) {
                return 5;
            }
        }

        if (6 <= columnIndex <= 8) {
            if (0 <= rowIndex <= 2) {
                return 6;
            }

            if (3 <= rowIndex <= 5) {
                return 7;
            }

            if (6 <= rowIndex <= 8) {
                return 8;
            }
        }
    }
}

window.addEventListener('load', event => {
    let board = new Board();
    console.table(board.cells);
});