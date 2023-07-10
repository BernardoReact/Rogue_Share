import Vector2d from "./vector2d";

class Position {
    #x;
    #y;

    constructor ( x, y ) {
        this.#x = x;
        this.#y = y;
    }

    plus ( vector ) {
        return new Position ( this.#x + vector?.i, this.#y + vector?.j )
    }

    minus ( vector ) {
        return new Position ( this.#x - vector?.i, this.#y - vector?.j )
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

   /* toVector ( ) {
        return new Vector2d ( this.#x, this.#y )
    }*/

    toString() {
        return "(" + this.#x + ", " + this.#y + ")";
    }
}

export default Position;
