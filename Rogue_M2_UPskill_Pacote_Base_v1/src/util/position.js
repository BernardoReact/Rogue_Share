class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    plus(vector) {
        //TODO
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    equals(position) {
        return this.#x === position?.x && this.#y === position?.y;
    }

    toString() {
        return "(" + this.#x + ", " + this.#y + ")";
    }
}

export default Position;
