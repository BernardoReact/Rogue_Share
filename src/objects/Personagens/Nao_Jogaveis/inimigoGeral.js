import Personagem from "../personagemGeral.js";
import Direction from "../../../util/direction.js";
import Hero from "../Jogavel/hero.js";

class Inimigo extends Personagem {
    pontos = 0;
    limiteVisao = 3;

    constructor ( position ) {
        super ( position );
    }

    get image( ) {
        return "";
    }

    danoSofrido ( valorDano ) {
        try {
            this.vida = this.vida - valorDano
            if ( this.vida < 0 )
                throw new RangeError ( "A vida não pode ser negativa. Vai ser redefinida para zero (0)." )
            this.toString ( valorDano )
        } catch ( erro ) {
            console.log ( "ERRO: " + erro.message )
            this.vida = 0
        }

        if ( this.vida === 0 ) {
            this.motor.pontuacao += this.pontos
            this.gui.showMessage ( `${ this.constructor.name } foi derrotado. Ganhou ${ this.pontos }! Novo total ${ this.motor.pontuacao }!` )
            this.derrotado ( )               
        }
    }

    movimentoBase ( novaPosicao ) {
        switch ( novaPosicao ) {
            case  1 :
                return this.position.plus ( Direction.UP.asVector ( ) )
            case  2 :
                return this.position.plus ( Direction.DOWN.asVector ( ) )
            case  3 :
                return this.position.plus ( Direction.LEFT.asVector ( ) )            
            case  4 :
                return this.position.plus ( Direction.RIGHT.asVector ( ) )
            default :
            break;
        }
    }

    geraAleatorio ( valorMin, valorMax ) {
        return Math.floor ( Math.random ( ) * ( valorMax - valorMin + 1 ) + valorMin )
    }

    movimentoAleatorio ( ) {
        let novaPosicao = this.geraAleatorio ( 1, 4 )
        return this.movimentoBase ( novaPosicao )
    }

    oHeroi ( lista ) {
        let heroiLista = lista.filter ( ( casa ) => { return casa instanceof Hero } );
        return heroiLista [ 0 ]
    }

    distanciaHeroi ( posicao, lista ) {
        return Math.sqrt ( ( ( posicao.x - this.oHeroi ( lista ).position.x ) ** 2 ) + ( ( posicao.y - this.oHeroi ( lista ).position.y ) ** 2 ) );
    }

    movimentoPerseguicao ( lista ) {
        let movimentosPossiveis = [ 1, 2, 3, 4 ];
        let posicoesPossiveis = movimentosPossiveis.map ( ( opcao ) => { return this.movimentoBase ( opcao ) } );
        let distanciaMinima = Infinity,
            posicaoMinima = 0,
            contagemDecrescente = posicoesPossiveis.length,
            posicaoEncontrada = posicoesPossiveis [ posicaoMinima ];
        

        // Iteração para devolver, caso exista, uma posição, disponível, que minimize a distância deste inimigo ao heroi. 
        while ( contagemDecrescente > 0 ) {
            for ( let i = ( posicoesPossiveis.length - 1 ); i >= 0; i-- ) {
                let distancia = this.distanciaHeroi ( posicoesPossiveis [ i ], lista )
                if ( distancia <= distanciaMinima ) {
                    distanciaMinima = distancia
                    posicaoMinima = i
                    posicaoEncontrada = posicoesPossiveis [ i ];
                }
            }

            if ( this.verificaColisoes ( posicaoEncontrada, lista ) ) {
                if ( this.oHeroi ( lista ).position.equals ( posicaoEncontrada ) ) {
                    return posicaoEncontrada
                } else {    //Sendo encontrada uma colisão, que não pode ser um ataque, a posição encontrada é removida da lista de posições possíveis, e o contador desce em um.
                    posicoesPossiveis.splice ( posicaoMinima, 1 )
                    contagemDecrescente--
                }
            } else {
                return posicaoEncontrada
            }
        }
    }

    verificaColisoes ( instrucao, lista ) {
        let casasOcupadasNaPosicao = lista.filter ( ( casa ) => { return ( casa.position.equals ( instrucao ) ) } )
            return casasOcupadasNaPosicao.some ( ( casa ) => { return ( !casa.sobreposicao ) } )
    }

    move ( movimentoHero, lista ) { //O "movimentoHero" é dado como parâmetro mas nunca lido. É para manter a coerência entre o método "move ( )" dos "inimigoGeral" e de "Heroi"
        let repeteAteConseguir = true
        // Verifica se o heroi está no campo de visão do inimigo e decide o tipo de movimento a fazer.
        if ( this.distanciaHeroi ( this.position, lista ) < this.limiteVisao ) {
            // O heroi está dentro do campo de visão, o movimento escolhido é o de perseguição. 
            while ( repeteAteConseguir ) {      
                // De modo a que o inimigo faça sempre um movimento quando o heroi se move, o movimento é sorteado até ser um valor válido.   
                try {
                    let novaDirecao = this.movimentoPerseguicao ( lista )
                    //console.log ( "Encontrei nova posicao: " + novaDirecao )
                    try {
                        if ( !novaDirecao )
                            throw new TypeError ( "não encontrou nenhuma casa livre que diminua a distância." )    
                    } catch ( error ) {
                        console.log ( `ERRO: este ${ this.constructor.name } ` + error.message )
                        novaDirecao = this.movimentoAleatorio ( )
                    }
                    // No caso de o movimento sair dos limites da sala, um erro é lançado, e o sorteio reiniciado.
                    if ( novaDirecao.x < 0 || novaDirecao.x >= 10 || novaDirecao.y < 0 || novaDirecao.y >= 10 ) 
                        throw new RangeError ( "Movimento para fora da sala." )
                    // No caso de o movimento resultar numa colisão, um erro é lançado, e o sorteio reiniciado.
                    if ( this.verificaColisoes ( novaDirecao, lista ) )
                        if ( this.oHeroi ( lista ).position.equals ( novaDirecao )  ) {
                            repeteAteConseguir = false
                            return this.ataca ( lista, novaDirecao )
                        } else
                            throw new RangeError ( "Colisão. Tenta um novo movimento." )
                    repeteAteConseguir = false
                   // console.log ( "Vou aplicar a nova posicao: " + novaDirecao )
                    return this.position = novaDirecao
                } catch ( error ) {
                    console.log ( `ERRO: este ${ this.constructor.name } ` + error.message )
                }
            }        
        } else {
            // O heroi está fora do campo de visão, o movimento escolhido é o aleatório. 
            let escape = 0
            while ( repeteAteConseguir && escape < 100 ) {
                // De modo a que o inimigo faça sempre um movimento quando o heroi se move, o movimento é sorteado até ser um valor válido.           
                try {
                    let novaDirecao = this.movimentoAleatorio ( )
                    // No caso de o movimento sair dos limites da sala, um erro é lançado, e o sorteio reiniciado.
                    if ( novaDirecao.x < 0 || novaDirecao.x >= 10 || novaDirecao.y < 0 || novaDirecao.y >= 10 ) 
                        throw new RangeError ( "Movimento para fora da sala." )
                    // No caso de o movimento sair dos limites da sala, um erro é lançado, e o sorteio reiniciado.
                    if ( this.verificaColisoes ( novaDirecao, lista )  ) {
                        escape++
                        throw new RangeError ( "colisão. Tenta um novo movimento." )
                    }
                    repeteAteConseguir = false
                    return this.position = novaDirecao
                } catch ( error ) {
                    console.log ( `ERRO: este ${ this.constructor.name } teve uma ` + error.message )
                }
            }
        }
    }
}

export default Inimigo;