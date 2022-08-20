/**
 * Un Jugador.
 */
class Player {
    /**
     * Crea una instancia de Jugador con un identificador único (su 
     * dirección de correo electrónico), nombre(s) de pila y 
     * apellido(s).
     * 
     * @param {string} email Una cadena de texto con una dirección válida
     * de correo electrónico del jugador (su identificador único).
     * @param {string} firstName Una cadena de texto con el/los nombre(s) de
     * pila del jugador.
     * @param {string} lastName Una cadena de texto con el/los apellido(s)
     * del jugador.
     */
    constructor(email, firstName = '', lastName = '') {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    /**
     * Devuelve la dirección de correo electrónico con que se identifica
     * el jugador. Si no se ha establecido la dirección de correo 
     * electrónico del jugador, devuelve una cadena de texto vacía.
     */
    get email() {
        return this._email || '';
    }


    /**
     * Establece la dirección de correo electrónico con que se identifica
     * el jugador.
     * 
     * @param {string} value - Una cadena de texto con una dirección válida 
     * de correo electrónico del Jugador.
     */
    set email(value) {
        this._email = `${value || ''}`.trim();
    }


    /**
     * Devuelve el/los nombre(s) de pila del jugador. Si no se ha establecido
     * el/los nombre(s) de pila del jugador devuelve una cadena de texto vacía.
     */
    get firstName() {
        return this._fname || '';
    }


    /**
     * Establece el/los nombre(s) de pila del jugador.
     * 
     * @param {string} value - Una cadena de texto con el/los nombre(s) de
     * pila del jugador.
     */
    set firstName(value) {
        this._fname = `${value || ''}`.trim();
    }


    /**
     * Devuelve el/los apellido(s) del jugador. Si no se ha establecido el/los
     * apellido(s) del jugador devuelve una cadena de texto vacía.
     */
    get lastName() {
        return this._lname || '';
    }


    /**
     * Establece el/los apellido(s) del jugador.
     * 
     * @param {string} value - Una cadena de texto con el/los apellido(s) del
     * jugador.
     */
    set lastName(value) {
        this._lname = `${value || ''}`.trim();
    }


    /**
     * Devuelve un Objeto JSON representando al jugador.
     * 
     * @returns Un Objeto JSON con las propiedades del jugador.
     */
    toJSON = () => {
        return { email: this.email, firstName: this.firstName, lastName: this.lastName };
    }


    /**
     * Devuelve una representación del jugador incluyendo su(s) nombre(s) de pila,
     * apellido(s) y dirección de correo electrónico.
     * 
     * @returns Una cadena completa con el/los nombre(s) de pila, apellido(s) y
     * dirección de correo electrónico que identifica al jugador.
     */
    toString = () => {
        return `Jugador: ${this.firstName} ${this.lastName} <${this.email || 'no e-mail'}>`.trim();
    }


    /**
     * Devuelve una nueva instancia de Jugador con un identificador único (su 
     * dirección de correo electrónico), nombre(s) de pila y apellido(s).
     * 
     * @param {string} email Una cadena de texto con una dirección válida
     * de correo electrónico del jugador (su identificador único).
     * @param {string} firstName Una cadena de texto con el/los nombre(s) de
     * pila del jugador.
     * @param {string} lastName Una cadena de texto con el/los apellido(s)
     * del jugador.
     */
     static getPlayer = (email, firstName = '', lastName = '') => {
        return new Player(email, firstName, lastName);
    }
}
