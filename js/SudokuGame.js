/**
 * Un juego de Sudoku.
 */
class SudokuGame {
    static TERMINATION_CAUSE = {
        NOT_TERMINATED: 0,
        SUCCESS: 2,
        CANCELED: 4,
        UNKNOWN: 16,
    }


    // Niveles de dificultad.
    static GAME_LEVEL = {
        // Nivel fácil
        EASY: {
            'levelName': 'Fácil',
            'minSquareEmptyCells': 0,   // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
            'maxSquareEmptyCells': 4,   // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
            'minRowEmptyCells': 0,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 5,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 0,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 5,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel medio
        MEDIUM: {
            'levelName': 'Medio',
            'minSquareEmptyCells': 1,   // Número mínimo de celdas vacías en un Cuadro (3 x 3 celdas)
            'maxSquareEmptyCells': 6,   // Número máximo de celdas vacías en un Cuadro (3 x 3 celdas)
            'minRowEmptyCells': 1,      // Número mínimo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'maxRowEmptyCells': 6,      // Número máximo de celdas vacías en una Fila (9 x 1 celdas - horizontal)
            'minColEmptyCells': 1,      // Número mínimo de celdas vacías en una Columna (1 x 9 celdas - vertical)
            'maxColEmptyCells': 6,      // Número máximo de celdas vacías en una Columna (1 x 9 celdas - vertical)
        },
        // Nivel difícil
        HARD: {
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
     * @constructor
     * Crea una instancia de Juego de Sudoku, con un tablero y un jugador.
     * 
     * @param {SudokuGame.GAME_LEVEL} level El nivel de dificultad del juego.
     */
    constructor(level = SudokuGame.GAME_LEVEL.EASY) {
        this._player = null;
        this.board = SudokuBoard.getBoard(level);
        this._createdOn = Date.now();
        this._playPeriods = [];
        this._currentStartTime = -1;
        this._running = false;
        this._terminated = false;
        this._terminatedTime = -1;
        this._terminationCause = SudokuGame.TERMINATION_CAUSE.NOT_TERMINATED;

        // Preferencias
        this.settings = {
            highlightSameDigits: true,
            showRemainingDigits: true,
            autoNotesRemoval: true,
            showTimer: true,
            differentiateLockedCells: true,
            doubleTapToRemoveCellContent: false,
            holdToRemoveCellContent: false,
        }

        // Mapeo de 'Elementos de juego' a Nodos del HTML
        this.htmlNodeMap = {
            cells: [
                {id: 0, nodeId: null }, {id: 1, nodeId: null }, {id: 2, nodeId: null },
                {id: 3, nodeId: null }, {id: 4, nodeId: null }, {id: 5, nodeId: null },
                {id: 6, nodeId: null }, {id: 7, nodeId: null }, {id: 8, nodeId: null },
                {id: 9, nodeId: null }, {id: 10, nodeId: null }, {id: 11, nodeId: null },
                {id: 12, nodeId: null }, {id: 13, nodeId: null }, {id: 14, nodeId: null },
                {id: 15, nodeId: null }, {id: 16, nodeId: null }, {id: 17, nodeId: null },
                {id: 18, nodeId: null }, {id: 19, nodeId: null }, {id: 20, nodeId: null },
                {id: 21, nodeId: null }, {id: 22, nodeId: null }, {id: 23, nodeId: null },
                {id: 24, nodeId: null }, {id: 25, nodeId: null }, {id: 26, nodeId: null },
                {id: 27, nodeId: null }, {id: 28, nodeId: null }, {id: 29, nodeId: null },
                {id: 30, nodeId: null }, {id: 31, nodeId: null }, {id: 32, nodeId: null },
                {id: 33, nodeId: null }, {id: 34, nodeId: null }, {id: 35, nodeId: null },
                {id: 36, nodeId: null }, {id: 37, nodeId: null }, {id: 38, nodeId: null },
                {id: 39, nodeId: null }, {id: 40, nodeId: null }, {id: 41, nodeId: null },
                {id: 42, nodeId: null }, {id: 43, nodeId: null }, {id: 44, nodeId: null },
                {id: 45, nodeId: null }, {id: 46, nodeId: null }, {id: 47, nodeId: null },
                {id: 48, nodeId: null }, {id: 49, nodeId: null }, {id: 50, nodeId: null },
                {id: 51, nodeId: null }, {id: 52, nodeId: null }, {id: 53, nodeId: null },
                {id: 54, nodeId: null }, {id: 55, nodeId: null }, {id: 56, nodeId: null },
                {id: 57, nodeId: null }, {id: 58, nodeId: null }, {id: 59, nodeId: null },
                {id: 60, nodeId: null }, {id: 61, nodeId: null }, {id: 62, nodeId: null },
                {id: 63, nodeId: null }, {id: 64, nodeId: null }, {id: 65, nodeId: null },
                {id: 66, nodeId: null }, {id: 67, nodeId: null }, {id: 68, nodeId: null },
                {id: 69, nodeId: null }, {id: 70, nodeId: null }, {id: 71, nodeId: null },
                {id: 72, nodeId: null }, {id: 73, nodeId: null }, {id: 74, nodeId: null },
                {id: 75, nodeId: null }, {id: 76, nodeId: null }, {id: 77, nodeId: null },
                {id: 78, nodeId: null }, {id: 79, nodeId: null }, {id: 80, nodeId: null },
            ],
            timer: null,
            digits: [
                { digit: 1, nodeId: null },
                { digit: 2, nodeId: null },
                { digit: 3, nodeId: null },
                { digit: 4, nodeId: null },
                { digit: 5, nodeId: null },
                { digit: 6, nodeId: null },
                { digit: 7, nodeId: null },
                { digit: 8, nodeId: null },
                { digit: 9, nodeId: null }
            ],
            remainingDigits: [
                { digit: 1, nodeId: null },
                { digit: 2, nodeId: null },
                { digit: 3, nodeId: null },
                { digit: 4, nodeId: null },
                { digit: 5, nodeId: null },
                { digit: 6, nodeId: null },
                { digit: 7, nodeId: null },
                { digit: 8, nodeId: null },
                { digit: 9, nodeId: null }
            ],
            settings: {
                highlightSameDigits: null,
                showRemainingDigits: null,
                autoNotesRemoval: null,
                showTimer: null,
                differentiateLockedCells: null,
                doubleTapToRemoveCellContent: null,
                holdToRemoveCellContent: null
            }
        }
    }


    set player(value) {
        this._player = value || new Player("email@address.com", "Anonymous", "Player");
    }


    get player() {
        return this._player;
    }


    /**
     * Devuelve la fecha y hora en que fue creado el juego.
     */
    get createdOn() {
        return this._createdOn;
    }

    
    // Actualiza una preferencia del juego.
    updateSetting(settingState) {
        const {id, status} = settingState;

        switch(id) {
            case 'highlight-same-digits':
                this.settings.highlightSameDigits = status;
                break;
            case 'show-remaining-digits':
                this.settings.showRemainingDigits = status;
                break;
            case 'auto-notes-removal':
                this.autoNotesRemoval = status;
                break;
            case 'show-timer':
                this.showTimer = status;
                break;
            case 'differentiate-locked-cells':
                this.settings.differentiateLockedCells = status;
                break;
            case 'double-tap-to-remove-cell-content':
                this.settings.doubleTapToRemoveCellContent = status;
                break;
            case 'hold-to-remove-cell-content':
                this.settings.holdToRemoveCellContent = status;
                break;
            default:
                return false;
        }

        return true;
    }


    /**
     * Devuelve el estado del reloj del juego: true si está corriendo, false
     * si está detenido.
     * 
     * @returns true si el reloj del juego está corriendo, false de lo contrario.
     */
    isRunning = () => {
        return this._running;
    }


    /**
     * Devuelve el estado de terminación del juego: true si ha sido terminado,
     * false si todavía no se ha terminado.
     * 
     * @returns true si el juego ya fue terminado, false de lo contrario.
     */
    isTerminated = () => {
        return this._terminated;
    }


    /**
     * Inicia el contador de tiempo para un nuevo período de juego. Si hay un período 
     * de juego activo, devuelve falso.
     * 
     * @returns true si se inició un nuevo período de juego, false de lo contrario.
     */
    start = () => {
        if (!this.isTerminated() && !this.isRunning()) {
            // Captura la fecha y hora actual (en milisegundos desde el período de referencia).
            const startTime = Date.now();

            // Guarda la fecha/hora de inicio del período actual.
            this._currentStartTime = startTime;

            // Crea un nuevo objeto de período de juego ...
            const playPeriod = {
                // Inicializa el tiempo de inicio,
                startTime: this._currentStartTime,

                // Inicializa el tiempo de paro a -1 (inválido),
                stopTime: -1,

                // Inicializa el tiempo total a -1 (inválido),
                totalMilliseconds: -1
            }

            // Agrega el objeto de período de juego al arreglo de períodos de juego.
            this._playPeriods.push(playPeriod);

            // Cambia el estatus de 'corriendo' a true.
            this._running = true;

            // Confirma que se llevó a cabo la operación devolviendo el timestamp de inicio.
            return startTime;
        }

        // Notifica que no se llevó a cabo la operación.
        return null;
    }


    /**
     * Detiene el contador de tiempo para el período de juego activo. Si no hay un
     * período de juego activo, devuelve falso.
     * 
     * @returns true si se detuvo el período de juego activo, false de lo contrario.
     */
    stop = () => {
        if (!this.isTerminated() && this.isRunning()) {
            // Captura la fecha y hora actual (en milisegundos desde el período de refrencia).
            const stopTime = Date.now();

            // Recupera el período de juego actual.
            const currentPlayPeriod = this._playPeriods.find(period => period.startTime === this._currentStartTime);

            // Actualiza las propiedades stopTime y totalMilliseconds del objeto.
            currentPlayPeriod.stopTime = stopTime;
            currentPlayPeriod.totalMilliseconds = stopTime - currentPlayPeriod.startTime;

            // Devuelve la fecha/hora de inicio del período actual a un estado inválido.
            this._currentStartTime = -1;

            // Cambia el estsus de 'corriendo' a false.
            this._running = false;

            // Confirma que se llevó a cabo la operación devolviendo el timestamp de parada.
            return stopTime;
        }

        // Notifica que no se llevó a cabo la operación.
        return null;
    }


    /**
     * Termina el Juego de Sudoku. No aceptará más llamados a los métodos {@link start}
     * o {@link stop}. Se podrán seguir llamando los métodos.
     * 
     * @param {SudokuGame.TERMINATION_CAUSE} cause - Causa de terminación.
     * 
     * @returns Fecha/hora de terminación, en milisegundos.
     */
    terminate = cause => {
        // Establece en verdadero la propiedad terminado.
        this._terminated = true;

        // Establece la fechhora de terminación.
        this._terminatedTime = this.stop() || Date.now();
        this._terminationCause = cause || SudokuGame.TERMINATION_CAUSE.UNKNOWN;

        return this._terminatedTime;
    }


    /**
     * Devuelte el último timestamp de arranque, en milisegundos. Si el 
     * juego no está 'corriendo', devuelve -1.
     * 
     * @returns El último timestamp de arranque, en milisegundos.
     */
    getLastStartTimestamp = () => {
        return this._currentStartTime;
    }


    /**
     * Devuelve una cadena de texto con los detalles del juego.
     * 
     * @returns Una cadena de texto con los detalles del juego.
     */
    toString = () => {
        const dateCreated = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' }).format(this.createdOn);

        return `Juego de Sudoku: (${this.board}; ${this.player}; created on ${dateCreated})`;
    }


    /**
     * Devuelve las opciones de formato de segundos para el tiempo total
     * jugado.
     * 
     * @returns Un objeto que contiene las opciones de formato de segundos
     * para el tiempo total jugado.
     */
    static getMinutesDisplayOptions = () => {
        return { minimumIntegerDigits: 1 };
    }


    /**
     * Devuelve las opciones de formato de minutos para el tiempo total
     * jugado.
     * 
     * @returns Un objeto que contiene las opciones de formato de minutos
     * para el tiempo total jugado.
     */
    static getSecondsFormatOptions = () => {
        return { minimumIntegerDigits: 2, maximumFractionDigits: 1 };
    }


    /**
     * Devuelve una nueva instancia de Juego de Sudoku, con un tablero
     * y un jugador.
     * 
     * @param {SudokuBoard} board Un tablero de Sudoku.
     * @param {Player} player Un jugador.
     */
    static getSudokuGame = (board, player) => {
        return new SudokuGame(board, player);
    }
}