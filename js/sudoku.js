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

// Primero el Tablero
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
            'minSquareEmptyCells': 0,   // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
            'maxSquareEmptyCells': 4,   // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
            'minRowEmptyCells': 0,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 5,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 0,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 5,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel medio
        'medium': {
            'levelName': 'Medio',
            'minSquareEmptyCells': 1,   // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
            'maxSquareEmptyCells': 6,   // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
            'minRowEmptyCells': 1,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 6,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 1,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 6,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel difícil
        'hard': {
            'levelName': 'Difícil',
            'minSquareEmptyCells': 3,  // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
            'maxSquareEmptyCells': 9,  // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
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

        // Hacerlo, por lo menos, una vez:
        do {
            // Llenar la grilla con ceros (0's)
            this._grid = Board.getEmptyGrid();
            // Intentar llenar la grilla con números válidos.
            this.#fillGrid();
        } while(!Board.isValidGrid(this._grid));    // Hasta que la grilla sea válida.

        // Copia la grilla creada en una solución que servirá después para comparar.
        this._solution = this.grid;
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
     * Devuelve el nombre del nivel de dificultad del tablero.
     */
    get levelName() {
        return Board.getLevelSpecs(this._level).levelName;
    }


    /**
     * Devuelve el arreglo de números que subyace en el tablero.
     */
    get grid() {
        return this._grid;
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
     * Dibuja un tablero de Sudoku en un elemento (Nodo) dentro de un documento
     * html.
     * 
     * @param {Node} parentNode El nodo (elemento) padre donde se dibujará el tablero.
     */
    draw = (parentNode) => {
        const boardFragment = document.createDocumentFragment();

        const boardDiv = document.createElement('div');
        boardDiv.id = 'sudoku-board';

        for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
            const squareDiv = document.createElement('div');
            squareDiv.id = `square-${squareIndex}`;
            squareDiv.classList.add('square');
            
            switch (squareIndex) {
                case 0:
                    this.#drawCellDiv(0, 0, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;
                
                case 1:
                    this.#drawCellDiv(0, 3, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;
                
                case 2:
                    this.#drawCellDiv(0, 6, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 3:
                    this.#drawCellDiv(3, 0, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 4:
                    this.#drawCellDiv(3, 3, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 5:
                    this.#drawCellDiv(3, 6, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 6:
                    this.#drawCellDiv(6, 0, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 7:
                    this.#drawCellDiv(6, 3, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;

                case 8:
                    this.#drawCellDiv(6, 6, squareDiv);
                    boardDiv.appendChild(squareDiv);
                    break;
                
                default:
                    break;
            }
        }

        boardFragment.appendChild(boardDiv);

        parentNode.appendChild(boardFragment);
    }


    /**
     * Dibuja una submatriz (cuadro) de 3 filas x 3 columnas en el tablero de Sudoku.
     * 
     * @param {int} startRowIndex El índice de la primera fila de la subamtriz (cuadro)
     * @param {int} startColIndex El índice de la primera columna de la submatriz (cuadro)
     * @param {Node} parentNode El nodo padre en el que se dibujará la submatriz (cuadro)
     */
    #drawCellDiv = (startRowIndex, startColIndex, parentNode) => {
        for (let i = startRowIndex; i < startRowIndex + 3; i++) {
            for (let j = startColIndex; j < startColIndex + 3; j++) {
                const cellDiv = document.createElement('div');
                cellDiv.id = `cell-${9 * i + j}`;
                cellDiv.classList.add('cell', `row-${i}`, `col-${j}`);

                const cellText = document.createElement('p');
                cellText.id = `text-${9 * i + j}`;
                cellText.classList.add('cell-text');
                cellDiv.appendChild(cellText);

                const cellValue = document.createElement('span');
                cellValue.id = `value-${9 * i + j}`;
                cellValue.classList.add('cell-value', 'hidden');

                if (this._grid[i][j] !== 0) {
                    cellValue.textContent = `${this._grid[i][j]}`;
                    cellValue.classList.toggle('hidden');
                }

                cellText.appendChild(cellValue);

                const cellNoteList = document.createElement('ul');
                cellNoteList.id = `notes-${9 * i + j}`;
                cellNoteList.classList.add('cell-notes', 'hidden');
                cellDiv.appendChild(cellNoteList);

                parentNode.appendChild(cellDiv);
            }
        }
    }


    /**
     * Llena la grilla del Tablero con valores de Sudoku.
     * 
     * @param {Array[]} grid La grilla que se va a poblar con valores de Sudoku.
     * @param {Array} shuffledNumbers Un arreglo de números válidos desordenado.
     * @returns true si la grilla pudo ser llenada con valores de Sudoku, false de lo contrario.
     */
    #fillGrid = () => {
        // Inicializar las variables con las que se trabajará la grilla.
        let intRow = 0;
        let intCol = 0;
        let validValue = 0;
        // Un arreglo desordenado de números válidos.
        let shuffledNumbers = [];

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
            let squareArray = Board.getSquareArrayByRowCol(this._grid, intRow, intCol);

            // Si el arreglo desordenado de números válidos está vacío ...
            if (shuffledNumbers.length === 0) {
                // ... volver a llenarlo con otro arreglo desordenado de números válidos.
                shuffledNumbers = Board.shuffleArray(Board.getValidNumbers());
            }

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


    /**
     * Devuelve una grilla llena de ceros (0's).
     */
     static getEmptyGrid = () => {
        return [
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
     * Extrae un arreglo de valores (números) que corresponden a una submatriz,
     * dentro de la grilla general del Sudoku, identificada por una fila y 
     * columna específicas.
     * 
     * @param {Array[]} grid La grilla de la que se desea extraer una 
     * submatriz.
     * @param {int} row El índice de la fila dentro de la grilla.
     * @param {int} col El índice de la columna dentro de la grilla.
     * @returns Un arreglo con los números que corresponden a la submatriz 
     * dentro del cuadro que corresponde a la fila y columna proporcionados.
     */
    static getSquareArrayByRowCol = (grid, row, col) => {
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
     * Devuelve un arreglo de 9 números enteros que se extraen de la sbmatriz,
     * de tres (3) filas x tres (3) columnas, dentro de la matriz general de 
     * Sudoku [matriz de nueve (9) filas x nueve (9) columnas]. La submatriz
     * está identificada por el índice correspondiente. El índice cero (0) 
     * corresponde a las primeras tres (3) filas y tres (3) columnas, el índice
     * uno (1) corresponde a las tres (3) columnas centrales de las tres (3)
     * primeras filas, el índice dos (2) corresponde a las tres (3) columnas
     * finales de las tres (3) primeras filas, y así sucesivamente, hasta el
     * índice ocho (8), que corresponde a las tres (3) últimas columnas de las
     * tres (3) últimas filas.
     * 
     * @param {Array[]} grid La grilla de 9 filas x 9 columnas de la que se 
     * extraerá la submatriz.
     * @param {int} squareIndex Un entero entre cero (0) y ocho (8), incusive,
     * que identifica a la submatriz dentro de la grilla.
     * @returns Una sumatriz de tres (3) filas x tres (3) columnas que 
     * corresponde a la matriz general de Sudoku.
     */
    static getSquareArrayByIndex = (grid, squareIndex) => {
        const squareArray = [];

        switch(squareIndex) {
            case 0:
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 1:
                for (let i = 0; i < 3; i++) {
                    for (let j = 3; j < 6; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 2:
                for (let i = 0; i < 3; i++) {
                    for (let j = 6; j < 9; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 3:
                for (let i = 3; i < 6; i++) {
                    for (let j = 0; j < 3; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 4:
                for (let i = 3; i < 6; i++) {
                    for (let j = 3; j < 6; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 5:
                for (let i = 3; i < 6; i++) {
                    for (let j = 6; j < 9; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 6:
                for (let i = 6; i < 9; i++) {
                    for (let j = 0; j < 3; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 7:
                for (let i = 6; i < 9; i++) {
                    for (let j = 3; j < 6; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            case 8:
                for (let i = 6; i < 9; i++) {
                    for (let j = 6; j < 9; j++) {
                        squareArray.push(grid[i][j]);
                    }
                }
                break;
            default:
                break;
        }

        return squareArray;
    }


    /**
     * Devuelve el índice del cuadrado que corresponde a la celda identificada 
     * por el índice de fila y columna (enteros entre 0 y 8, inclusive) de la 
     * grilla de un tablero de Sudoku.
     * 
     * @param {int} rowIndex Índice de la fila (entero entre 0 y 8, inclusive)
     * @param {int} colIndex Índice de la columna (entero entre 0 y 8, inclusive)
     * @returns Un entero entre 0 y 8 que indica el índice del cuadrado al que 
     * pertenece la fila y columna correspondiente. Si uno de los argumentos 
     * proporcionados es inválido, o se omite, devuelve -1.
     */
    static getSquareIndex = (rowIndex, colIndex) => {
        if (rowIndex !== null && colIndex !== null && (rowIndex >= 0 && rowIndex < 9) && (colIndex >= 0 && colIndex < 9)) {
            return 3 * Math.floor(rowIndex / 3) + Math.floor(colIndex / 3);
        }

        return -1;
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


    static solveGrid(grid) {
        // Inicializa las variable con las que se recorre y resuelve la grilla.
        let intRow = 0;
        let intCol = 0;
        let validValue = 0;
        // Un arreglo desordenado de números válidos.
        let shuffledNumbers = [];

        // Para las 81 celdas de la grilla:
        for (let i = 0; i < 81; i++) {
            // ïndice de la fila.
            intRow = Math.floor(i / 9);
            // Índice de la columna.
            intCol = i % 9;

            // Si la celda correspondiente contiene un cero (0) ...
            if (grid[intRow][intCol] === 0) {
                // ... intenta resolver la grilla.

                // El arreglo de la fila correspondiente.
                let rowArray = grid[intRow];

                // El arreglo de la columna correspondiente.
                let colArray = grid.map(row => row[intCol]);

                // El arreglo del cuadro correspondiente.
                let squareArray = Board.getSquareArrayByRowCol(grid, intRow, intCol);

                // Si está vacío el arreglo desordenado de números válidos ...
                if (shuffledNumbers.length === 0) {
                    // ... se llena.
                    shuffledNumbers = Board.shuffleArray(Board.getValidNumbers());
                }

                // Busca un número en el arreglo desordenado de números válidos
                validValue = shuffledNumbers.find((item, index) => {
                    // que no esté en ninguno de los arreglos (fila, columna, cuadro) y ...
                    if (rowArray.indexOf(item) === -1 && colArray.indexOf(item) === -1 && squareArray.indexOf(item) === -1) {
                        // ... si lo encuentra, lo elimina del arreglo de números desordenados.
                        return shuffledNumbers.splice(index, 1)[0];
                    }
                });

                // Si no encuentra un número válido ...
                if (!validValue) {
                    // ... asignar cero (0) a esa celda y ...
                    grid[intRow][intCol] = 0;

                    // ... darse por vencido.
                    break;
                } else {
                    // De lo contrario asigna el valor encontrado a esa celda ...
                    grid[intRow][intCol] = validValue;
                }
            }
        }
    }

    
    /**
     * Devuelve un valor entero pseudo-aleatorio dentro del rango especificado:
     * [min, max]. Si se desea omitir el valor máximo en los posibles valores
     * devueltos, se debe proporcionar un valor falso (false) en el parámetro
     * inclusive, en ese caso devolverá un valor entero pseudo-aleatorio dentro
     * del rango especificado sin incluir el valor máximo [min, max).
     * 
     * @param {int} min El valor mínimo en el rango de enteros.
     * @param {int} max El valor máximo en el rango de enteros.
     * @param {boolean} inclusive true si el rango de enteros debe inluir al
     * valor máximo (por defecto), false si el rango de enteros debe omitir
     * al valor máximo.
     * @returns Un entero pseudo-aleatorio entre el rango mínimo y el máximo
     * proporcionados. Por defecto incluye también al rango máximo. Si se desea
     * omitir el valor máximo se puede pasar un valor false para el parámetro
     * inclusive.
     */
    static getRandomInteger(min, max, inclusive = true) {
        return Math.floor(Math.random() * ((inclusive ? 1 : 0) + max - min)) + min;
    }


    static getPlayGrid(grid, level) {
        const levelSpecs = Board.getLevelSpecs(level);
        /*
        'minSquareEmptyCells': 0,   // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
        'maxSquareEmptyCells': 4,   // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
        'minRowEmptyCells': 0,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
        'maxRowEmptyCells': 5,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
        'minColEmptyCells': 0,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        'maxColEmptyCells': 5,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        */
        for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
            const squareArray = Board.getSquareArrayByIndex(grid, squareIndex);
            const squareEmptyCells = Board.getRandomInteger(levelSpecs.minSquareEmptyCells, levelSpecs.maxSquareEmptyCells);
            const rowEmptyCells = Board.getRandomInteger(levelSpecs.minRowEmptyCells, levelSpecs.maxRowEmptyCells);
            const colEmptyCells = Board.getRandomInteger(levelSpecs.minColEmptyCells, levelSpecs.maxColEmptyCells);

            // TODO: Implement.
        }
    }
}


const sudokuBoardContainer = document.getElementById('sudoku-board-container');

const board = Board.getBoard();

board.draw(sudokuBoardContainer);
