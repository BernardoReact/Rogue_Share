import Interface from "../game/interface.js";
import Position from "../util/position.js";
import Black from "../objects/Barra_de_estado/black.js";
import Fireball from "../objects/Barra_de_estado/fireball.js";
import Green from "../objects/Barra_de_estado/green.js";
import RedGreen from "../objects/Barra_de_estado/redgreen.js";
import Red from "../objects/Barra_de_estado/red.js";

class BarraDeEstado {
    barra = [ ];
    gui = Interface.getInstance ( );


    static #instance;
    static getInstance ( ) {
        if ( BarraDeEstado.#instance === undefined ) {
            BarraDeEstado.#instance = new BarraDeEstado ( );
        }
        return BarraDeEstado.#instance;
    }

    constructor ( ) {
        for ( let x = 0; x < 10; x++ ) {
            let posicao = new Position ( x , 10 );
            this.barra.push ( new Black ( posicao ) );
        }

        for ( let x = 0; x < 3; x++ ) {
            let posicao = new Position ( x , 10 );
            this.barra.push ( new Fireball ( posicao ) );
        }

        for ( let x = 3; x < 7; x++ ) {
            let posicao = new Position ( x , 10 );
            this.barra.push ( new Green ( posicao ) );
        }

        this.gui.addStatusImages ( this.barra );
    }

    ePar ( valor ) {
        if ( ( valor % 2 ) === 0 )
            return true
        else
            return false
    }

    haRedGreen ( ) {
        return this.barra.some ( ( casa ) => { return casa instanceof RedGreen } )
    }
    
    dano ( ) {
        let vidaMaximaActual = 0;
        
        if ( this.haRedGreen ( ) )
            vidaMaximaActual = this.barra.findLastIndex ( ( casa ) => { return casa instanceof RedGreen } );
        else
            vidaMaximaActual = this.barra.findLastIndex ( ( casa ) => { return casa instanceof Green } );
        
        let posicaoX = this.barra [ vidaMaximaActual ].position.x;
        
        if ( this.haRedGreen ( ) ) {
            this.gui.removeStatusImage ( this.barra [ vidaMaximaActual ] )
            this.barra.splice ( vidaMaximaActual, 1 )
            this.barra.push ( new Red ( new Position ( posicaoX, 10 ) ) )
        } else {
            this.gui.removeStatusImage ( this.barra [ vidaMaximaActual ] )
            this.barra.splice ( vidaMaximaActual, 1 )
            this.barra.push ( new RedGreen ( new Position ( posicaoX, 10 ) ) )
        }
        this.gui.addStatusImages ( this.barra )
        this.gui.update ( )
    }

    recebeDano ( valorDano ) {
        for ( let i = valorDano; i > 0; i -- ) {
            this.dano ( )
        }
    }
}

export default BarraDeEstado;