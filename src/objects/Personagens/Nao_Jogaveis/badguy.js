import Inimigo from "./inimigoGeral.js";
import Direction from "../../../util/direction.js";

class BadGuy extends Inimigo {
    vida = 35;
    pontos = 17;
    
    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "BadGuy.gif";
    }

    movimentoAleatorio ( ) {
        let novaPosicao = this.geraAleatorio ( 1, 8 )
        //MOVIMENTO ALEATÓRIO DE UMA (1) CASA
        switch ( novaPosicao ) {
            case  1 :
                return this.position.plus ( Direction.UP.asVector ( ) )
            case  2 :
                return this.position.plus ( Direction.UPRIGHT.asVector ( ) )
            case  3 :
                return this.position.plus ( Direction.RIGHT.asVector ( ) )
            case  4 :
                return this.position.plus ( Direction.DOWNRIGHT.asVector ( ) )
            case  5 :
                return this.position.plus ( Direction.DOWN.asVector ( ) )
            case  6 :
                return this.position.plus ( Direction.DOWNLEFT.asVector ( ) )
            case  7 :
                return this.position.plus ( Direction.LEFT.asVector ( ) )
            case  8 :
                return this.position.plus ( Direction.UPLEFT.asVector ( ) )
            default :
                break
        }
    }
}

export default BadGuy;