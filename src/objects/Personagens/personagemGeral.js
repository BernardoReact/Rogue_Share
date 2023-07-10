import ImageTile from "../../game/imageTile.js";
import Engine from "../../game/engine.js";
import Interface from "../../game/interface.js";
import Position from "../../util/position.js";
import Blood from "../Ambiente/blood.js";

class Personagem extends ImageTile {
    motor = Engine.getInstance ( ) ;
    gui = Interface.getInstance ( ) ;
    sobreposicao = false;
    vida = 8;
    valorAtaque = 1;

    constructor ( position ) {
        super ( position )
    }

    get image() {
        return ""
    }

    danoSofrido ( valorDano ) {
        try {
            this.vida = this.vida - valorDano;
            if ( this.vida < 0 )
                throw new RangeError ( "O valor de vida não pode ser negativo ( < 0 ). Vai ser redefinido como zero (0)." )
        } catch {
            console.log ( "ERRO :" + erro.message )
            this.vida = 0
        }
         
        if ( this.vida === 0 )
            return this.derrotado ( )
    }

    ataca ( lista, novaPosicao ) {  
        console.log ( `Este ${ this.constructor.name } atacou!` )
        let alvoAtaque = lista.findIndex ( 
            function ( casa ) {
                if ( ( casa instanceof Personagem ) && ( casa.position.equals ( novaPosicao ) ) )
                    return casa
            }
        ) ;
        return lista [ alvoAtaque ].danoSofrido ( this.valorAtaque ) 
    }

    verificaNovaPosicao ( instrucao, lista ) {
        let novaPosicao = this.position.plus ( instrucao );
        let casasOcupadasNaPosicao = lista.filter ( ( casa ) => { return ( casa.position.equals ( novaPosicao ) ) } );
        return casasOcupadasNaPosicao
    }

    verificaColisoes ( instrucao, lista ) {
        return this.verificaNovaPosicao ( instrucao, lista ).some ( ( casa ) => { return  ( !casa.sobreposicao ) } );
    }

    move ( ) { 
        return this.position = this.position.plus (  )
    }

    derrotado ( ) {
        let indiceDerrotado = this.motor.casasPersonagens.findIndex ( ( boneco ) => { return boneco === this } );
        let personagemDerrotado = this.motor.casasPersonagens [ indiceDerrotado ];
        
        let posicao = new Position ( personagemDerrotado.position.x, personagemDerrotado.position.y );
        this.motor.casasAmbiente.push ( new Blood ( posicao ) )
        
        this.gui.removeImage ( personagemDerrotado )
        this.motor.casasPersonagens.splice ( indiceDerrotado, 1 )
                
        this.gui.addImages ( this.motor.casasAmbiente )
        this.gui.update ( )
        this.motor.casasMestre = this.motor.casasAmbiente.concat ( this.motor.casasPersonagens )
    }

    toString ( valorDano ) {
        return `O ${ this.constructor.name } sofreu ${ valorDano } de dano. Resta-lhe ${ this.vida } de vida.` 
    }
}

export default Personagem;
