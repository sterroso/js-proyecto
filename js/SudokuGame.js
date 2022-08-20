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


    /**
     * @constructor
     * Crea una instancia de Juego de Sudoku, con un tablero y un jugador.
     * 
     * @param {string} level El nivel de dificultad del juego.
     * @param {Player} player Un jugador.
     */
    constructor(player, level = 'easy') {
        this.player = (player || Player.getPlayer("placeholder@mail.co", "Anonymous", "Player"));
        this.board = SudokuBoard.getBoard(level);
        this._createdOn = Date.now();
        this._playPeriods = [];
        this._currentStartTime = -1;
        this._running = false;
        this._terminated = false;
        this._terminatedTime = -1;
        this._terminationCause = SudokuGame.TERMINATION_CAUSE.NOT_TERMINATED;
    }


    /**
     * Devuelve la fecha y hora en que fue creado el juego.
     */
    get createdOn() {
        return this._createdOn;
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