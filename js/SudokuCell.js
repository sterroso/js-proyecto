class SudokuCell {
    constructor(id, value = null, fixed = true) {
        this.id = id;
        this.value = value;
        this._isFixed = fixed;
        this._valueNode = null;
        this._notesNode = null;
        this._cellNode = null;
        this.#initCellNode();
        this.isSelected = false;
        this.isHighlighted = false;
    }


    /**
     * Establece el identificador único de la celda. Su identificador define
     * la posición de la celda dentro del tablero de Sudoku. No pueden haber
     * dos celdas con el mismo identificador en un tablero de Sudoku.
     * 
     * Su valor puede estar entre 0 y 80, inclusive.
     * 
     * @param {int} idValue El identificador de la celda.
     */
    set id(idValue) {
        if (idValue && (idValue >= 0 && idValue <= 80)) {
            this._id = idValue;
        } else {
            this._id = -1;
        }
    }


    /**
     * Devuelve el identificador único de la celda.
     */
    get id() {
        return this._id;
    }


    /**
     * Previene que se modifique accidentalmente el índice de la fila.
     * 
     * @param {int} param El índice de la fila.
     */
    set rowIndex(param) { return false; }
    

    /**
     * Devuelve el índice de la fila en la que se encuentra la celda.
     */
    get rowIndex() {
        return this.id === -1 ? this.id : Math.floor(this.id / 9);
    }


    /**
     * Previene que se modifique accidentalmente el índice de la columna;
     * 
     * @param {int} param El índice de la columna.
     */
    set colIndex(param) { return false; }


    /**
     * Devuelve el índice de la columna en la que se encuentra la celda.
     */
    get colIndex() {
        return this.id === -1 ? this.id : this.id % 9;
    }


    /**
     * Previene que se modifique accidentalmente el índice de la submatriz.
     * 
     * @param {int} param El índice de la submatriz.
     */
    set squareIndex(param) { return false; }


    /**
     * Devuelve el índice de la submatriz, o cuadro, en la que se encuentra la celda.
     */
    get squareIndex() {
        return this.id === -1 ? this.id : 3 * Math.floor(this.rowIndex / 3) + Math.floor(this.colIndex / 3);
    }


    /**
     * Establece el valor de la celda. El valor proporcionado debe ser un
     * entero entre 1 y 9, inclusive. Si el valor proporcionado no es válido,
     * se asignará un valor de cero (0).
     * 
     * @param {int} value El valor de la celda.
     */
    set value(value) {
        this._value = (value && value >= 1 && value <= 9) ? value : 0;
    }


    /**
     * Devuelve el valor de la celda.
     */
    get value() {
        return this._value;
    }


    /**
     * Previene que se modifique el fragmento accidentalmente.
     * 
     * @param {Element} node Elemento HTML.
     */
    set cellNode(node) { return false; }


    /**
     * Devuelve una referencia al nodo html contenedor de la Celda.
     * 
     * @returns {Element} Elemento HTML (div) contenedor de la Celda.
     */
    get cellNode() { return this._cellNode; }


    /**
     * Previene que se modifique accidentalmente la propiedad isFixed.
     * 
     * @param {boolean} value El valor de la propiedad isFixed.
     */
    set isFixed(value) { return false; }


    /**
     * Devuelve verdadero si la celda tiene un valor fijo, y falso si es
     * una celda editable.
     * 
     * @returns {boolean} Verdadero si es celda fija, falso si es celda editable.
     */
    get isFixed() { return this._isFixed; }


    /**
     * Establece la propiedad isHighlighted (resaltado) de la Celda.
     * 
     * @param {boolean} value El valor de la propiedad isHighlighted.
     */
    set isHighlighted(value) {
        if (value) {
            this.cellNode.classList.add('highlighted');
        } else {
            this.cellNode.classList.remove('highlighted')
        }
    }


    /**
     * Establece la propiedad isSelected (selección) de la Celda.
     * 
     * @param {boolean} value El valor de la propiedad isSelected.
     */
    set isSelected(value) {
        if (value) {
            this.cellNode.classList.add('selected');
        } else {
            this.cellNode.classList.remove('selected');
        }
    }


    /**
     * Previene la modificación externa de la referencia al nodo de valor.
     * 
     * @param {Element} node El nodo HTML del elemento (div) que contiene
     * el valor de la celda.
     */
    set valueNode(node) { return false; }


    /**
     * Devuelve una referencia al nodo HTML (div) que contiene al valor
     * de la celda.
     */
    get valueNode() { return this._valueNode; }


    /**
     * Previene la modificación externa de la referencia al nodo de notas.
     */
    set notesNode(node) { return false; }


    /**
     * Devuelve una referencia al nodo HTML (div) que contiene las notas
     * de valores posibles de la celda.
     */
    get notesNode() { return this._notesNode; }


    /**
     * Método privado que inicializa el nodo HTML (div) contenedor
     * de la celda, tanto su valor como sus notas.
     */
    #initCellNode = () => {
        this._cellNode = document.createElement('div');
        this.cellNode.id = `cell-${this.id}`;
        this.cellNode.classList.add('cell', `square-${this.squareIndex}`, `row-${this.rowIndex}`, `col-${this.colIndex}`);

        this._valueNode = document.createElement('div');
        this.valueNode.classList.add('value-container');
        if (this.isFixed) {
            this.valueNode.classList.add('fixed-value');
            this.valueNode.textContent = this.value;
        }

        this.cellNode.appendChild(this.valueNode);

        this._notesNode = document.createElement('ul');
        this.notesNode.classList.add('notes-container', 'hidden');

        for (let noteValue = 1; noteValue <= 9; noteValue++) {
            const noteItem = document.createElement('li');
            noteItem.classList.add('note-item', 'invisible');
            noteItem.textContent = `${noteValue}`;
            this.notesNode.appendChild(noteItem);
        }

        this.cellNode.appendChild(this.notesNode);
    }
}