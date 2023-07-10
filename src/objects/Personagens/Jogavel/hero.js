import Personagem from "../personagemGeral.js";
import BarraDeEstado from "../../../util/gestorBarraEstado.js";
import Inimigo from "../Nao_Jogaveis/inimigoGeral.js";

class Hero extends Personagem {
    barra = BarraDeEstado.getInstance ( );

    constructor ( position ) {
        super ( position )
    }

    get image ( ) {
        return "Hero.png";
    }
    
    danoSofrido ( valorDano ) {
        console.log ( `Argh! Sofri ${ valorDano } de dano.` )
        try {
            if ( valorDano > this.vida )
                throw new RangeError ( "O valor de vida não pode ser negativo ( < 0 ). Vai ser redefinido como zero (0)." )
        } catch ( erro ) {
            console.log ( "ERRO :" + erro.message )
            valorDano = this.vida
        }
            
        this.barra.recebeDano ( valorDano )

        while ( valorDano > 0 ) {
            this.vida--
            valorDano--
        }
        
        if ( this.vida === 0 ) {
            this.derrotado ( )
            this.gui.showMessage ( `O herói foi derrotado, o jogo terminou. PONTUAÇÃO FINAL - ${ this.motor.pontuacao } PONTOS!` )
        }
    }

    identificaInimigo ( instrucao, lista ) {
        return this.verificaNovaPosicao ( instrucao, lista ).some ( ( casa ) => { return ( casa instanceof Inimigo ) } )
    }

    move ( instrucao, lista ) {
        try {
            let novaPosicao = this.position.plus ( instrucao )
            if ( novaPosicao.x < 0 || novaPosicao.x >= 10 || novaPosicao.y < 0 || novaPosicao.y >= 10 ) {
                        throw new RangeError ( "Movimento para fora da sala." )
            }
            if ( this.verificaColisoes ( instrucao, lista ) ) {
                if ( this.identificaInimigo ( instrucao, lista ) )
                    return this.ataca ( lista, novaPosicao )
                else
                   throw new RangeError ( "Colisão. Tenta um novo movimento." )
            } else {
                try {
                    this.motor.pontuacao--
                    if ( this.motor.pontuacao < 0 )
                        throw new RangeError ( "A pontuação não pode ser abaixo de zero (0). Será redfininida como zero (0)." )
                } catch ( erro ) {
                    this.motor.pontuacao = 0
                    console.log ( erro.message )
                }
                return this.position = novaPosicao
            }     
        } catch ( erro ) {
            console.log ( "ERRO: " + erro.message )
        }   
    }
}

export default Hero;
