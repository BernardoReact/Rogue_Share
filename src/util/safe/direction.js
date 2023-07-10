import Vector2d from "./vector2d.js";

class Direction {
    #dir;
    constructor(dir) {
        this.#dir = dir;
    }

    static get UP ( ) { return new Direction ( "UP" ); }
    static get RIGHT ( ) { return new Direction ( "RIGHT" ); }
    static get DOWN ( ) { return new Direction ( "DOWN" ); }
    static get LEFT ( ) { return new Direction ( "LEFT" ); }
    static get UPRIGHT ( ) { return new Direction ( "UPRIGHT" ); }
    static get DOWNRIGHT ( ) { return new Direction ( "DOWNRIGHT" ); }
    static get DOWNLEFT ( ) { return new Direction ( "DOWNLEFT" ); }
    static get UPLEFT ( ) { return new Direction ( "UPLEFT" ); }

    asVector ( ) {
        switch ( this.#dir ) {
            case "UP" :
                return new Vector2d ( 0, -1 )
            case "UPRIGHT" :
                return new Vector2d ( 1, -1 )
            case "RIGHT" :
                return new Vector2d ( 1, 0 )
            case "DOWNRIGHT" :
                return new Vector2d ( 1, 1 )
            case "DOWN" :
                return new Vector2d ( 0, 1 )
            case "DOWNLEFT" :
                return new Vector2d ( -1, 1 )
            case "LEFT" :
                return new Vector2d ( -1, 0 )
            case "UPLEFT" :
                return new Vector2d ( -1, -1 )
            default :
                break
        }
    }
}
export default Direction;
