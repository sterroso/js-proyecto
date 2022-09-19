// Conetendor del tablero de Sudoku.
const sudokuBoard = document.getElementById('sudoku-board');

// Juego
const game = SudokuGame.getSudokuGame();

// Dibuja el tablero en el contenedor del tablero de Sudoku.
sudokuBoard.appendChild(game.board.getBoardFragment());


// Panel de usuario.
const playerPanel = document.getElementById('player-panel');

// Botón de apertura del panel de usuario.
const showPlayerPanelButton = document.getElementById('show-player-panel');

// Evento 'click' del botón de apertura del panel de usuario.
showPlayerPanelButton.addEventListener('click', event => {
    playerPanel.classList.toggle('hidden');
});

// Botón de cierre del panel de usuario.
const playerPanelCloseButton = document.getElementById('player-panel-close-button');

// Evento 'click' del botón de cierre del panel de usuario.
playerPanelCloseButton.addEventListener('click', event => {
    playerPanel.classList.toggle('hidden');
});


// Panel de preferencias.
const settingsPanel = document.getElementById('settings-panel');

// Botón de apertura del panel de preferencias.
const showSettingsPanelButton = document.getElementById('show-settings-panel');

// Evento 'click' del botón de apertura del panel de preferencias.
showSettingsPanelButton.addEventListener('click', event => {
    settingsPanel.classList.toggle('hidden');
});

// Botón de cierre del panel de preferencias.
const settingsPanelCloseButton = document.getElementById('settings-panel-close-button');

// Evento 'click' del botón de cierre del panel de preferencias.
settingsPanelCloseButton.addEventListener('click', event => {
    settingsPanel.classList.toggle('hidden');
});


// Checkboxes de los submenús de preferencias.
const settingsButtons = document.querySelectorAll('.checkbox');

// Evento click de los checkboxes en los submenús de preferencias.
settingsButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (button.classList.contains('on')) {
            button.setAttribute('aria-checked', 'false');
        } else {
            button.setAttribute('aria-checked', 'true');
        }

        button.classList.toggle('on');

        const setting = JSON.parse(`{ "id": "${button.id}", "status": ${button.getAttribute('aria-checked')} }`);

        game.updateSetting(setting);

        console.debug(game.settings);
    });
});


// Botón de arranque / parada del juego y reloj
const startButton = document.getElementById('start-button');

// Id del intervalo de actualización del timer
let timerIntervalId;

const timerContainer = document.getElementById('timer-container');

// Evento de 'click' para el botón de arranque / parada del juego y reloj
startButton.addEventListener('click', event => {
    const startButtonSpan = startButton.getElementsByTagName('span')[0];

    if (startButton.classList.contains('running')) {
        startButtonSpan.textContent = 'timer';

        game.stop();

        document.removeEventListener('keyup', handleKeyboardEvents);

        clearInterval(timerIntervalId);

        if (game.settings.showTimer) {
            timerContainer.textContent = "";
        }

        Toastify({
            text: 'Juego detenido',
            duration: 2500,
            gravity: 'bottom',
        }).showToast();
    } else {
        startButtonSpan.textContent = 'timer_off';

        game.start();

        document.addEventListener('keyup', handleKeyboardEvents);

        timerIntervalId = setInterval(() => {
            if (game.settings.showTimer) {
                timerContainer.textContent = game.getCurrentTimerString();
            }
        }, 200);

        Toastify({
            text: 'Juego iniciado',
            duration: 2500,
            gravity: 'bottom',
        }).showToast();
    }

    startButton.classList.toggle('running');
});

const handleKeyboardEvents = event => {
    const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];

    if (event.key in validKeys) {
        if (game.board.selectedCell) {
            switch (event.key) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    game.board.selectedCell.value = parseInt(event.key);
                    break;
                case 'Backspace':
                case 'Delete':
                    game.board.selectedCell.value = 0;
                    break;
                default:
                    break;
            }
        }
    }
}
