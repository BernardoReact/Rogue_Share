class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    plus(vector) {
        return new Position ( this.#x + vector.i, this.#y + vector.j )
    }

    minus ( vector ) {
        return new Position ( this.#x + vector.i, this.#y + vector.j )
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    equals ( position ) {
        return this.#x === position?.x && this.#y === position?.y;
    }

    distancia ( position ) {
        return Math.sqrt ( ( ( this.#x - position?.x ) ** 2 ) + ( ( this.#y - position?.y ) ** 2 ) ) ;
    }

    toString() {
        return "(" + this.#x + ", " + this.#y + ")";
    }
}

export default Position;
