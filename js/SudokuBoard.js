/**
 * Un tablero de Sudoku.
 */
class SudokuBoard {
    /**
     * Define un tablero de Sudoku
     * 
     * @param {SudokuGame.GAME_LEVEL} level Nivel de dificultad del tablero.
     */
    constructor(level = SudokuGame.GAME_LEVEL.EASY) {
        this.level = level

        this._solved = false;

        this.selectedCellId = null;

        // Hacerlo, por lo menos, una vez:
        do {
            // Intentar llenar la cuadrícula con números válidos.
            this.baseGrid = this.fillBaseGrid();
        } while(!SudokuBoard.isValidGrid(this.baseGrid));    // Hasta que la cuadrícula sea válida.

        // Genera la cuadrícula 'jugable' para el jugador.
        this.playerGrid = this.fillPlayerGrid();

        // Crea un arreglo donde se guardarán los objetos SudokuCell.
        this._cells = [];

        // Inicializa el arreglo de objetos SudokuCell.
        this.initCells();
    }


    /**
     * Establece el nivel de dificultad del tablero, si el valor proporcionado es 
     * válido. Si el nuevo valor es diferente al nivel de dificultad anterior, 
     * borra todo el contenido del tablero y lo vuelve a poblar.
     * 
     * @param {SudokuGame.GAME_LEVEL} level El nuevo nivel de dificultad del tablero.
     * @returns true si el nivel de dificultad proporcionado es válido, false de lo 
     * contrario.
     */
    set level(level = SudokuGame.GAME_LEVEL.EASY) {
        this._level = level || SudokuGame.GAME_LEVEL.EASY;
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
        return this.level.levelName;
    }


    /**
     * Establece la cuadrícula base.
     */
    set baseGrid(value) {
        this._baseGrid = value || this.fillBaseGrid();
    }


    /**
     * Devuelve el arreglo de números que subyace en el tablero.
     */
    get baseGrid() {
        return this._baseGrid;
    }


    /**
     * Establece la cuadrícula del jugador.
     */
    set playerGrid(value) {
        this._playerGrid = value || this.fillPlayerGrid();
    }


    /**
     * Devuelve la cuadrícula del jugador.
     */
    get playerGrid() {
        return this._playerGrid;
    }


    /**
     * Previene la modificación de las celdas.
     */
    set cells(cells) { return false; }


    /**
     * Devuelve una referencia a las celdas.
     */
    get cells() { return this._cells; }


    /**
     * Indica si el tablero de Sudoku ya está resuelto.
     * 
     * @returns true si el tablero ya está resuelto, false de lo contrario.
     */
    get solved () {
        return this.playerGrid === this.baseGrid;
    }


    /**
     * Crea las celdas que componen el tablero.
     */
    initCells = () => {
        let intRow = 0;
        let intCol = 0;
        let gridValue = 0;
        let fixedCell = true;

        for (let cellIndex = 0; cellIndex < 81; cellIndex++) {
            intRow = Math.floor(cellIndex / 9);
            intCol = cellIndex % 9;
            gridValue = this.playerGrid[intRow][intCol];
            fixedCell = gridValue !== 0;
            
            this.cells.push(new SudokuCell(cellIndex, gridValue, fixedCell));
        }
    }


    /**
     * Devuelve un fragmento html con el tablero de Sudoku.
     * 
     * @returns un fragmento html (documentFragment) con el tablero Sudoku.
     */
    getBoardFragment = () => {
        // El fragmento html que contendrá al tablero de Sudoku
        const boardFragment = document.createDocumentFragment();

        for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
            // El nodo de la submatriz correspondiente.
            const squareDiv = document.createElement('div');
            squareDiv.id = `square-${squareIndex}`;
            squareDiv.classList.add('square');

            // Filtra las celdas que corresponden a la submatriz correspondiente.
            const squareCells = this.cells.filter(cell => cell.squareIndex === squareIndex);

            // Agrega los fragmentos de las celdas filtrada al nodo div de la submatriz.
            squareCells.forEach(cell => squareDiv.appendChild(cell.cellNode));

            // Agrega el nodo div de la submatriz al tablero.
            boardFragment.appendChild(squareDiv);
        }

        // Devuelve el fragmento.
        return boardFragment;
    }


    /**
     * Llena la cuadrícula del Tablero con valores de Sudoku.
     * 
     * @returns Una cuadrícula (un arreglo bidimensional de 9 filas x 9
     * columnas), lleno con números válidos, de acuerdo don las reglas 
     * del Sudoku.
     */
    fillBaseGrid = () => {
        // Inicializa cuadrícula
        const grid = SudokuBoard.getEmptyGrid();

        // Inicializar las variables con las que se trabajará la cuadrícula.
        let intRow = 0;     // Índice entero de la fila.

        let intCol = 0;     // Índice entero de la columna.

        let intValue = 0;   // Valor entero de la celda (1..9)

        // Un arreglo desordenado de números válidos.
        let shuffledNumbers = [];

        // Para las 81 celdas de una cuadrícula ...
        for (let i = 0; i < 81; i++) {
            // El índice de la fila según el número de celda: 0..8 = 0, 9..17 = 1, ..., 72..80 = 8
            intRow = Math.floor(i / 9);

            // El índice de la columna según el número de la celda: 0 = 0, 1 = 1, ..., 8 = 8, 9 = 0, 
            // 10 = 1, ..., 80 = 8
            intCol = i % 9;

            // El arreglo de números de la cuadrícula en la fila correspondiente a la celda en turno.
            let rowArray = grid[intRow];

            // El arreglo de números de la cuadrícula en la columna correspondiente a la celda en turno.
            let colArray = grid.map(row => row[intCol]);

            // El arreglo de números en el cuadro donde se encuentra la celda en turno.
            let squareArray = SudokuBoard.getSquareArrayByRowCol(grid, intRow, intCol);

            // Si el arreglo desordenado de números válidos está vacío ...
            if (shuffledNumbers.length === 0) {
                // ... volver a llenarlo con otro arreglo desordenado de números válidos.
                shuffledNumbers = SudokuBoard.shuffleArray(SudokuBoard.getValidNumbers());
            }

            // Busca un número válido en el arreglo desordenado de números válidos:
            intValue = shuffledNumbers.find((item, index) => {
                // Si hay algún número en el arreglo desordenado que no esté en ninguno de los arreglos (fila, columna, cuadro) ...
                if (rowArray.indexOf(item) === -1 && colArray.indexOf(item) === -1 && squareArray.indexOf(item) === -1) {
                    // Elimina ese número del arreglo desordenado de números válidos y lo devuelve (para guardarlo en validValue)
                    return shuffledNumbers.splice(index, 1)[0];
                }
            });

            // Si no encuentra un número válido ...
            if (!intValue) {
                // ... asignar cero (0) a esa celda y ...
                grid[intRow][intCol] = 0;
                
                // ... darse por vencido (sale del bucle for)
                break;
            } else {
                // De lo contrario asigna el valor válido a esa celda.
                grid[intRow][intCol] = intValue;
            }
        }

        // Devuelve la cuadrícula con la que ha estado trabajando
        return grid;
    }


    /**
     * 'Borra', convirtiendo a ceros (0's), algunos valores de la cuadrícula original
     * para que el jugador pueda resolver la cuadrícula 'incompleta'.
     * 
     * @returns Una copia de la cuadrícula original con algunos elementos removidos.
     */
     fillPlayerGrid = () => {
        // Lista de las celdas 'visitadas' para borrar.
        const visitedCellArray = [];

        // Número aleatorio de celdas a borrar en cada cuadro.
        let randomCellDeleteAmount = 0;

        // Se asegura que la cuadrícula base esté llena
        if (!this.baseGrid) {
            this.baseGrid = this.fillBaseGrid();
        }

        // Clona la cuadrícula base para tener la solución como referencia y 
        // trabajar sobre el clon.
        const grid = this.baseGrid.slice().map(row => row.slice());

        // Constantes donde se guardarán los límites de celdas 'vacías' por cuadro,
        // fila y columna.
        const {minSquareEmptyCells, maxSquareEmptyCells, maxRowEmptyCells, maxColEmptyCells} = this.level;

        // Para cada cuadro del tablero de Sudoku ...
        for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
            // ... calcular un número aleatorio de celdas a borrar.
            randomCellDeleteAmount = SudokuBoard.getRandomInteger(minSquareEmptyCells, maxSquareEmptyCells);

            // Llevar un conteo de las celdas borradas en cada cuadro.
            for (let randomCellCount = 0; randomCellCount < randomCellDeleteAmount; randomCellCount++) {
                // Variable donde se guardará el índice de la fila donde se encuentra la celda
                // que se va a borrar.
                let randomRowIndex = -1;

                // Variable donde se guardará el índice de la columna donde se encuentra la 
                // celda que se va a borrar.
                let randomColIndex = -1;

                // El índice absoluto (0..80) de la celda que se va a borrar. Únicamente sirve 
                // para verificar que no se elija dos veces (el proceso de elección es aleatorio
                // y podría ocurrir que en dos pasadas diferentes salga la misma celda).
                let deleteCellIndex = -1;

                // Variable donde se guardará el número de celdas 'vacías' en una fila.
                let emptyCellsInRow = -1;

                // Variable donde se guardará el número de celdas 'vacías' en una columna.
                let emptyCellsInCol = -1;

                // Hacer este proceso, por lo menos una vez:
                do {
                    // Calcular aleatoriamente el índice de la fila donde se encuentra la celda
                    // que se va a borrar (respecto del cuadro actual).
                    randomRowIndex = SudokuBoard.getRandomInteger(0, 2) + 3 * Math.floor(squareIndex / 3);

                    // Calcular aleatoriamente el índice de la columna donde se encuentra la 
                    // celda que se va a borrar (respecto del cuadro actual).
                    randomColIndex = SudokuBoard.getRandomInteger(0, 2) + 3 * (squareIndex % 3);

                    // Calcular el índice absoluto de la celda (0..80) dentro de la cuadrícula de
                    // Sudoku, para verificar que no se haya calculado la misma anteriormente.
                    deleteCellIndex = 9 * randomRowIndex + randomColIndex;

                    // Y repetir, si es necesario, cuando el índice de la celda ya se encuentra en 
                    // la lista de celdas visitadas.

                    // Extraer la fila completa de la cuadrícula de trabajo
                    const rowArray = grid[randomRowIndex];

                    // Contar el número de celdas 'vacías' en la fila
                    emptyCellsInRow = rowArray.reduce(item => {item === 0}, 0);

                    // Extraer la columna completa de la cuadrícula de trabajo
                    const colArray = grid.map(row => row[randomColIndex]);

                    // Contar el número de celdas 'vacías' en la columna
                    emptyCellsInCol = colArray.reduce(item => {item === 0}, 0);

                    // Repetir si:
                    // 1. Ya se había elegido esa celda anteriormente.
                } while(visitedCellArray.some(item => item === deleteCellIndex) || 
                    // 2. El número de celdas 'vacías' en la fila ya llegó al máximo del nivel, o
                    emptyCellsInRow >= maxRowEmptyCells || 
                    // 3. El número de celdas 'vacías' en la columna ya llegó al máximo del nivel.
                    emptyCellsInCol >= maxColEmptyCells);

                // Si llega a este punto, es porque la celda no ha sido visitada antes, por lo
                // tanto se guarda el índice absoluto en la lista para futuras verificaciones.
                visitedCellArray.push(deleteCellIndex);

                // Si se llega a este punto, es porque no se ha llegado al límite máximo de 
                // celdas 'borradas' en la fila o columna, según el nivel, por lo que se 'borra' 
                // esa celda de la cuadrícula de trabajo.
                grid[randomRowIndex][randomColIndex] = 0;
            }
        }

        // Devuelve la cuadrícula clonada, con las celdas 'vacías'
        return grid;
    }


    /**
     * Devuelve una cadena de caracteres que indica el nivel de dificultad del tablero.
     * 
     * @returns Una cadena de caracteres que indica el nivel de dificultad del tablero.
     */
    toString = () => {
        return `Tablero de Sudoku: Nivel de dificultad ${this.level.levelName}`;
    }


    /**
     * Devuelve una cuadrícula 'vacía', llena de ceros (0's)
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
     * dentro de la cuadrícula general del Sudoku, identificada por una fila y 
     * columna específicas.
     * 
     * @param {Array[]} grid La cuadrícula de la que se desea extraer una 
     * submatriz.
     * @param {int} row El índice de la fila dentro de la cuadrícula.
     * @param {int} col El índice de la columna dentro de la cuadrícula.
     * @returns Un arreglo con los números que corresponden a la submatriz 
     * dentro del cuadro que corresponde a la fila y columna proporcionados.
     */
    static getSquareArrayByRowCol = (grid, row, col) => {
        // Inicializa el arreglo final a vacío.
        let squareArray = [];

        // Primera validación: La cuadrícula tiene 9 filas.
        let allIsValid = grid.length === 9;

        // Segunda validación: Cada fila de la cuadrícula tiene 9 celdas.
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
     * Devuelve el índice del cuadrado que corresponde a la celda identificada 
     * por el índice de fila y columna (enteros entre 0 y 8, inclusive) de la 
     * cuadrícula de un tablero de Sudoku.
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
     * Valida si la cuadrícula especificada es válida, según las reglas del Sudoku.
     * 
     * @param {Array} grid La cuadrícula bidimensional a validar.
     * @returns true si la cuadrícula es válida (según las reglas del Sudoku), false de lo contrario.
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
        return new SudokuBoard(level);
    }


    static solveGrid(grid) {
        // Inicializa las variable con las que se recorre y resuelve la cuadrícula.
        let intRow = 0;
        let intCol = 0;
        let validValue = 0;
        // Un arreglo desordenado de números válidos.
        let shuffledNumbers = [];

        // Para las 81 celdas de la cuadrícula:
        for (let i = 0; i < 81; i++) {
            // ïndice de la fila.
            intRow = Math.floor(i / 9);
            // Índice de la columna.
            intCol = i % 9;

            // Si la celda correspondiente contiene un cero (0) ...
            if (grid[intRow][intCol] === 0) {
                // ... intenta resolver la cuadrícula.

                // El arreglo de la fila correspondiente.
                let rowArray = grid[intRow];

                // El arreglo de la columna correspondiente.
                let colArray = grid.map(row => row[intCol]);

                // El arreglo del cuadro correspondiente.
                let squareArray = SudokuBoard.getSquareArrayByRowCol(grid, intRow, intCol);

                // Si está vacío el arreglo desordenado de números válidos ...
                if (shuffledNumbers.length === 0) {
                    // ... se llena.
                    shuffledNumbers = SudokuBoard.shuffleArray(SudokuBoard.getValidNumbers());
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
}
