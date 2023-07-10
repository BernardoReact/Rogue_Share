import Inimigo from "./inimigoGeral.js";
import Direction from "../../../util/direction.js"; //Porque é que isto é preciso aqui...

class Thief extends Inimigo {
    vida = 8;
    pontos = 8;
    valorAtaque = 2;
    
    constructor(position) {
        super(position);
    }

    get image() {
        return "Thief.gif";
    }

    movimentoBase ( novaPosicao ) {
            //MOVIMENTO ALEATÓRIO DE UMA (1) CASA NA DIAGONAL
        switch ( novaPosicao ) {
            case  1 :
                return this.position.plus ( Direction.UPRIGHT.asVector ( ) )
            case  2 :
                return this.position.plus ( Direction.DOWNRIGHT.asVector ( ) )
            case  3 :
                return this.position.plus ( Direction.DOWNLEFT.asVector ( ) )            
            case  4 :
                return this.position.plus ( Direction.UPLEFT.asVector ( ) )
            default :
            break;
        }
    }
}

export default Thief;