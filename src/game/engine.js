import Direction from "../util/direction.js";
import BarraDeEstado from "../util/gestorBarraEstado.js";
import Sala from "../util/gestorSala.js";
import room0 from "../../rooms/room0.js";
import room1 from "../../rooms/room1.js";
import room2 from "../../rooms/room2.js";
import Interface from "./interface.js";
import Fireball from "../objects/Barra_de_estado/fireball.js"

class Engine {
    gui = Interface.getInstance();
    sala = [ ];
    pontuacao = 0;
    casasAmbiente = [ ];
    casasPersonagens = [ ];
    casasObjectos = [ ];
    casasMestre = [ ];
    barraDeEstado = "barra de estado";
    ultimaDirecaoHeroi = "";

    static #instance;
    static getInstance ( ) {
        if ( Engine.#instance === undefined ) {
            Engine.#instance = new Engine ( );
        }
        return Engine.#instance;
    }

    static get heroiNaLista ( ) {
        return this.casasPersonagens [ 0 ] 
    }

    init ( ) {
        console.log ( "Engine init" );

        // CONSTUÇÃO DA BARRA DE ESTADO
        
        this.barraDeEstado = new BarraDeEstado;
        
        // CONSTRUÇÃO DA SALA

        this.sala = new Sala ( room0 );

        // Cópia das listas de elementos da sala para o motor.
        this.casasAmbiente = this.sala.casasAmbiente
        this.casasPersonagens = this.sala.casasPersonagens
        this.casasMestre = this.casasAmbiente.concat ( this.casasPersonagens )        

        this.gui.start ( );
    }
    
    keyPressed ( key ) {
        console.log ( "User pressed key", key );
        switch ( key ) {
            case "ArrowUp" :
                for ( let personagem of this.casasPersonagens )
                    personagem.move ( ( Direction.UP.asVector ( ) ), this.casasMestre )
                this.ultimaDirecaoHeroi = ( Direction.UP )
                break;    
            case "ArrowDown" :
                for ( let personagem of this.casasPersonagens )
                    personagem.move ( ( Direction.DOWN.asVector ( ) ), this.casasMestre )
                this.ultimaDirecaoHeroi = ( Direction.DOWN )
                break;
            case "ArrowLeft" :
                for ( let personagem of this.casasPersonagens )
                    personagem.move ( ( Direction.LEFT.asVector ( ) ), this.casasMestre )
                this.ultimaDirecaoHeroi = ( Direction.LEFT )
                break;
            case "ArrowRight" :
                for ( let personagem of this.casasPersonagens )
                    personagem.move ( ( Direction.RIGHT.asVector ( ) ), this.casasMestre )
                this.ultimaDirecaoHeroi = ( Direction.RIGHT )
                break;
            case "Space" :
                // INCOMPLETO
                let fireball = new Fireball ( this.casasPersonagens [ 0 ].position, this.ultimaDirecaoHeroi );
                this.gui.addImage ( fireball );
                fireball.start ( );
                break;    
            default :
                break;
        }
    }

    toString ( ) {
        return "Total : " + this.pontuacao + " pontos."
    }
}

export default Engine;
