// Conetendor del tablero de Sudoku.
const sudokuBoardContainer = document.getElementById('sudoku-board-container');

// Juego
const game = SudokuGame.getSudokuGame();

// Dibuja el tablero en el contenedor del tablero de Sudoku.
game.board.draw(sudokuBoardContainer);


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
