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
            differentiateLockedCells: true
        }

        // Mapeo de 'Elementos de juego' a Nodos del HTML
        this.htmlElements = [
            {
                tagName: 'div',
                nodeId: 'panel-buttons-tray',
                elements: [
                    { 
                        tagName: 'button', 
                        nodeId: 'open-stats-panel-button', 
                        classList: ['open-button'],
                        elements: [ { tagName: 'span', classList: ['material-symbols-outlined'], textContent: 'menu' } ]
                    },
                    { 
                        tagName: 'button', 
                        nodeId: 'open-settings-panel-button', 
                        classList: ['open-button'],
                        elements: [ { tagName: 'span', classList: ['material-symbols-outlined'], textContent: 'settings' } ]
                    }
                ]
            },
            {
                tagName: 'aside',
                nodeId: 'stats-panel',
                classList: ['hidden'],
                elements: [
                    {
                        tagName: 'button',
                        nodeId: 'stats-panel-close-button',
                        classList: ['close-button'],
                        elements: [ { tagName: 'span', classList: ['material-symbols-outlined'], textContent: 'close' } ]
                    },
                    {}
                ]
            },
            /*
            */
            { 
                nodeId: 'timer',
            },
            {
                commonClassList: ['digits-button'],
                elements: [
                    { digit: 1, nodeId: 'digits-button-1' },
                    { digit: 2, nodeId: 'digits-button-2' },
                    { digit: 3, nodeId: 'digits-button-3' },
                    { digit: 4, nodeId: 'digits-button-4' },
                    { digit: 5, nodeId: 'digits-button-5' },
                    { digit: 6, nodeId: 'digits-button-6' },
                    { digit: 7, nodeId: 'digits-button-7' },
                    { digit: 8, nodeId: 'digits-button-8' },
                    { digit: 9, nodeId: 'digits-button-9' }
                ]
            },
            {
                commonClassList: ['checkbox'],
                commonAttributesList: [
                    { name: 'role', value: 'switch' }
                ],
                elements: [
                    { nodeId: 'button-highlight-same-digits', attributesList: [ { name: 'aria-checked', defaultValue: 'true' } ] },
                    { nodeId: 'button-show-remaining-digits', attributesList: [ { name: 'aria-checked', defaultValue: 'true' } ] },
                    { nodeId: 'button-auto-notes-removal', attributesList: [ { name: 'aria-checked', defaultValue: 'true' } ] },
                    { nodeId: 'button-show-timer', attributesList: [ { name: 'aria-checked', defaultValue: 'true' } ] },
                    { nodeId: 'button-differentiate-locked-cells', attributesList: [ { name: 'aria-checked', defaultValue: 'true' } ] }
                ]
            }
        ];
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


    // Devuelve el arreglo con todos los períodos de juego
    get playPeriods() {
        return this._playPeriods;
    }


    get totalPlayTime() {
        // Variable donde se guardará el tiempo total (en milisegundos)
        let totalTime = 0;

        // Si ya está terminado, o está parado ...
        if (this.isTerminated || !this.isRunning) {
            // El tiempo total es la suma de milisegundos de todos los períodos de tiempo.
            totalTime = this.playPeriods.reduce((accumulator, period) => accumulator + period.totalMilliseconds, 0);

        // De lo contrario ...
        } else {
            // Un tiempo parcial es la suma de todos los períodos de tiempo + 1 milisegundo, 
            // porque el total del período corriendo actualmente es siempre -1.
            let partialTime = this.playPeriods.reduce((accumulator, period) => accumulator + period.totalMilliseconds, 1);

            // El tiempo de juego hasta el momento es la diferencia del tiempo actual y la
            // última vez que arraancó el juego.
            let currentTime = Date.now() - this.getLastStartTimestamp();

            // El tiempo total es la suma del tiempo parcial y el tiempo de juego hasta el momento.
            totalTime = partialTime + currentTime;
        }

        // Devuelve el tiempo total de juego hasta el momento.
        return totalTime;
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
    get isRunning() {
        return this._running;
    }


    /**
     * Devuelve el estado de terminación del juego: true si ha sido terminado,
     * false si todavía no se ha terminado.
     * 
     * @returns true si el juego ya fue terminado, false de lo contrario.
     */
    get isTerminated() {
        return this._terminated;
    }


    /**
     * Inicia el contador de tiempo para un nuevo período de juego. Si hay un período 
     * de juego activo, devuelve falso.
     * 
     * @returns true si se inició un nuevo período de juego, false de lo contrario.
     */
    start = () => {
        if (!this.isTerminated && !this.isRunning) {
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
        if (!this.isTerminated && this.isRunning) {
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


    getCurrentTimerString = (maxFractionalSeconds = 0) => {
        const totalTime = this.totalPlayTime;

        const totalMinutes = Math.floor(totalTime / (1000 * 60));

        const totalSeconds = (totalTime - (totalMinutes * 1000 * 60)) / 1000;

        const minutesString = new Intl.NumberFormat('es-MX', { minimumIntegerDigits: 1 }).format(totalMinutes);

        const secondsString = new Intl.NumberFormat('es-MX', { maximumFractionDigits: maxFractionalSeconds }).format(totalSeconds);

        return `${minutesString}m ${secondsString}s`;
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