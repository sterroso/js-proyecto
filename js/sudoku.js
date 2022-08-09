/**
 * Web Browser Sudoku
 * 
 * El juego de Sudoku es muy simple. El objetivo es llenar una cuadrícula de 9
 * filas y 9 columnas, dividida en 9 submatrices, cada una de tres (3) filas y tres
 * (3) columnas, con números del uno (1) al nueve (9), en ningún orden particular, sin 
 * que estos se repitan en una misma fila, en una misma columna, ni en la submatriz en 
 * la que se encuentra cada celda.
 * 
 * El Tablero de Sudoku
 * 
 * Un tablero, correctamente lleno, debe verse como el siguiente:
 * 
 * ++=====+=====+=====++=====+=====+=====++=====+=====+=====++ \ 
 * ||  4  |  9  |  3  ||  1  |  7  |  6  ||  2  |  8  |  5  ||  |
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |
 * ||  5  |  2  |  7  ||  8  |  4  |  9  ||  1  |  3  |  6  ||  |
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |
 * ||  8  |  1  |  6  ||  2  |  5  |  3  ||  4  |  7  |  9  ||  |
 * ++=====+=====+=====++=====+=====+=====++=====+=====+=====++  |
 * ||  2  |  5  |  1  ||  9  |  3  |  7  ||  6  |  4  |  8  ||  |
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |   Todos los números, del 1 al 9,
 * ||  7  |  8  |  4  ||  6  |  2  |  1  ||  5  |  9  |  3  ||   >  sin repetirse en fila, columna
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |   o submatriz.
 * ||  6  |  3  |  9  ||  4  |  8  |  5  ||  7  |  1  |  2  ||  |
 * ++=====+=====+=====++=====+=====+=====++=====+=====+=====++  |
 * ||  9  |  6  |  5  ||  7  |  1  |  8  ||  3  |  2  |  4  ||  |
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |
 * ||  3  |  7  |  2  ||  5  |  9  |  4  ||  8  |  6  |  1  ||  |
 * ++-----+-----+-----++-----+-----+-----++-----+-----+-----++  |
 * ||  1  |  4  |  8  ||  3  |  6  |  2  ||  9  |  5  |  7  ||  |
 * ++=====+=====+=====++=====+=====+=====++=====+=====+=====++ /
 * 
 * Objetivo del juego
 * 
 * Una vez que el tablero se encuentra completamente lleno, se borran algunos números
 * en unicaciones aleatorias, dejando suficientes pistas para que el jugador pueda 
 * resolver el tablero rellenando los espacios en blanco, considerando las reglas antes 
 * mencionadas.
 * 
 * Alcances del proyecto
 * 
 * El código debe ser capaz de:
 * 
 * 1. Generar un tablero completamente lleno, considerando las reglas del Sudoku.
 * 2. Dejar algunos espacios en blanco con suficientes pistas para que el jugador
 *    pueda llenarlos, de acuerdo con las reglas del Sudoku, y llegar al mismo
 *    tablero generado en el paso 1.
 * 3. Validar las respuestas del jugador contra el tablero generado en el paso 1.
 * 
 * Características adicionales
 * 
 * Además, sería ideal que la interfaz sea capaz de permitir, al jugador, contar con 
 * algunas pistas visuales que le permita visualizar con mayor facilidad la fila, 
 * columna y submatriz en la que se encuentra, hacer anotaciones de los números 
 * "candidatos" que pueden colocarse en las celdas vacías, guardar el juego para 
 * continuarlo en otro momento, elegir entre varios niveles de dificultad, tomar 
 * el tiempo que le lleva resolver un tablero y llevar registro de sus estadísticas
 * por nivel de dificultad y tiempo para resolverlo.
 * 
 */

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
    isValid = () => {
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
    static getMinValue = () => {
        return Cell.#MIN_VALUE;
    }

    /**
     * Devuelve el valor máximo que puede tener una celda de Sudoku.
     * 
     * @returns El valor máximo que puede terner una celda.
     */
    static getMaxValue = () => {
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

        // Hacerlo, por lo menos, una vez:
        do {
            // Llenar la grilla con ceros (0's)
            this.resetBoard();
            // Llenar la grilla con números válidos.
            this.fillGrid();
        } while(!Board.isValidGrid(this._grid));    // Hasta que la grilla sea válida.

        console.table(this._grid);
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


    /**
     * Convierte todos los números de la grilla en ceros (0's)
     */
    resetBoard = () => {
        this._grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    }


    /**
     * Llena la grilla del Tablero con valores de Sudoku.
     * 
     * @param {Array[]} grid La grilla que se va a poblar con valores de Sudoku.
     * @param {Array} shuffledNumbers Un arreglo de números válidos desordenado.
     * @returns true si la grilla pudo ser llenada con valores de Sudoku, false de lo contrario.
     */
    fillGrid = () => {
        // Inicializar las variables con las que se trabajará la grilla.
        let intRow = 0;
        let intCol = 0;
        let validValue = 0;
        // Un arreglo desordenado de números válidos.
        let shuffledNumbers = Board.shuffleArray(Board.getValidNumbers());

        // Para las 81 celdas de una grilla ...
        for (let i = 0; i < 81; i++) {
            // El índice de la fila según el número de celda: 0 -> 8 = 0, 9 -> 17 = 1, ..., 72 -> 80 = 8
            intRow = Math.floor(i / 9);
            // El índice de la columna según el número de la celda: 0 = 0, 1 = 1, 2 = 2, ..., 80 = 8
            intCol = i % 9;

            // El arreglo de números de la grilla en la fila correspondiente a la celda en turno.
            let rowArray = this._grid[intRow];

            // El arreglo de números de la grilla en la columna correspondiente a la celda en turno.
            let colArray = this._grid.map(row => row[intCol]);

            // El arreglo de números en el cuadro donde se encuentra la celda en turno.
            let squareArray = Board.getSquareArray(this._grid, intRow, intCol);

            // Busca un número válido en el arreglo desordenado de números válidos:
            validValue = shuffledNumbers.find((item, index) => {
                // Si hay algún número en el arreglo desordenado que no esté en ninguno de los arreglos (fila, columna, cuadro) ...
                if (rowArray.indexOf(item) === -1 && colArray.indexOf(item) === -1 && squareArray.indexOf(item) === -1) {
                    // Elimina ese número del arreglo desordenado de números válidos y lo devuelve (para guardarlo en validValue)
                    return shuffledNumbers.splice(index, 1)[0];
                }
            });

            // Si no encuentra un número válido ...
            if (!validValue) {
                // ... asignar cero (0) a esa celda y ...
                this._grid[intRow][intCol] = 0;
                // ... darse por vencido
                break;
            } else {
                // De lo contrario asigna el valor válido a esa celda.
                this._grid[intRow][intCol] = validValue;

                // Si el arreglo desordenado de números válidos se quedó vacío ...
                if (shuffledNumbers.length === 0) {
                    // ... volver a llenarlo con otro arreglo desordenado de números válidos.
                    shuffledNumbers = Board.shuffleArray(Board.getValidNumbers());
                }
            }
        }
    }

    /**
     * Devuelve una cadena de caracteres que indica el nivel de dificultad del tablero.
     * 
     * @returns Una cadena de caracteres que indica el nivel de dificultad del tablero.
     */
    toString = () => {
        return `Tablero de Sudoku. Nivel de dificultad: ${Board.getLevelName(this.level)}.`;
    }


    static getSquareArray = (grid, row, col) => {
        // Inicializa el arreglo final a vacío.
        let squareArray = [];

        // Primera validación: La grilla tiene 9 filas.
        let allIsValid = grid.length === 9;

        // Segunda validación: Cada fila de la grilla tiene 9 celdas.
        grid.forEach(gridRow => {
            allIsValid &&= gridRow.length === 9;
        });

        // Si pasa las dos validaciones anteriores, llena el arreglo final.
        if (allIsValid) {
            let rowStart = 3 * Math.floor(row / 3);   // 0, 1, 2 = 0; 3, 4, 5 = 3; 6, 7, 8 = 6
            let rowEnd = rowStart + 3           // 0, 1, 2 = 0 + 3 (3); 3, 4, 5 = 3 + 3 (6); 6, 7, 8 = 6 + 3 (9)
            let colStart = 3 * Math.floor(col / 3);   // 0, 1, 2 = 0; 3, 4, 5 = 3; 6, 7, 8 = 6
            let colEnd = colStart + 3           // 0, 1, 2 = 0 + 3 (3); 3, 4, 5 = 3 + 3 (6); 6, 7, 8 = 6 + 3 (9)

            for (let rowIndex = rowStart; rowIndex < rowEnd; rowIndex++) {
                for (let colIndex = colStart; colIndex < colEnd; colIndex++) {
                    squareArray.push(grid[rowIndex][colIndex]);
                }
            }
        }

        // Devuelve el arreglo final.
        return squareArray;
    }

    /**
     * Desordena aleatoriamente un arreglo.
     * 
     * @param {Array} array Arreglo a desordenar aleatoriamente.
     * @returns El nuevo arreglo desordenado.
     */
    static shuffleArray = array => {
        const itemCount = array.length;
        let newArray = [];
        let randomIndex = 0;

        for (let i = 0; i < itemCount; i++) {
            randomIndex = Math.floor(Math.random() * array.length);
            newArray.push(array.splice([randomIndex], 1)[0]);
        }

        return newArray;
    }
    
    /**
     * Valida si la grilla especificada es válida, según las reglas del Sudoku.
     * 
     * @param {Array} grid La grilla bidimensional a validar.
     * @returns true si la grilla es válida (según las reglas del Sudoku), false de lo contrario.
     */
    static isValidGrid = grid => {
        let retVal = true;

        grid.forEach(row => {
            row.forEach(cell => {
                retVal &&= cell !== 0;
            });
        });

        return retVal;
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

    /**
     * Devuelve un arreglo con los valores válidos para una Celda (Cell) de Sudoku.
     * 
     * @returns Un arreglo de números enteros.
     */
    static getValidNumbers = () => {
        const retValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return retValue;
    }


    /**
     * Genera una nueva instancia de un tablero de Sudoku con el nivel de dificultad 
     * especificado.
     * 
     * @param {string} level Nivel de dificultad.
     * @returns Una nueva instancia de un tablero de Sudoku.
     */
    static getBoard = level => {
        return new Board(level);
    }
}


