import Inimigo from "./inimigoGeral.js";

class Bat extends Inimigo {
    vida = 15;
    pontos = 7;

    constructor ( position ) {
        super ( position );
    }

    get image ( ) {
        return "Bat.gif";
    }

    movimentoAleatorio ( ) {
        let novaPosicao = this.geraAleatorio ( 1, 8 )
        //MOVIMENTO ALEATÓRIO DE UMA (1) CASA
        switch ( novaPosicao ) {
            case  1 :
                return this.position.plus ( Direction.UP.asVector ( ) ).plus ( Direction.UP.asVector ( ) )
            case  2 :
                return this.position.plus ( Direction.UPRIGHT.asVector ( ) ).plus ( Direction.UPRIGHT.asVector ( ) )
            case  3 :
                return this.position.plus ( Direction.RIGHT.asVector ( ) ).plus ( Direction.RIGHT.asVector ( ) )
            case  4 :
                return this.position.plus ( Direction.DOWNRIGHT.asVector ( ) ).plus ( Direction.DOWNRIGHT.asVector ( ) )          
            case  5 :
                return this.position.plus ( Direction.DOWN.asVector ( ) ).plus ( Direction.DOWN.asVector ( ) ) 
            case  6 :
                return this.position.plus ( Direction.DOWNLEFT.asVector ( ) ).plus ( Direction.DOWNLEFT.asVector ( ) ) 
            case  7 :
                return this.position.plus ( Direction.LEFT.asVector ( ) ).plus ( Direction.LEFT.asVector ( ) )
            case  8 :
                return this.position.plus ( Direction.UPLEFT.asVector ( ) ).plus ( Direction.UPLEFT.asVector ( ) ) 
            default :
                break
        }
    }
}

export default Bat;