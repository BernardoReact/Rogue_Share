import ImageTile from "./imageTile.js";
import Interface from "./interface.js";
import Engine from "./engine.js";

/**
* Classe base para poder extender e criar a FireBall.
* Não editar esta classe nem instanciar diretamente.
**/
class FireTile extends ImageTile {
    #direction;
    #active = false;
    #gui = Interface.getInstance ( );
    motor = Engine.getInstance ( );

    constructor ( position, direction ) {
        super ( position );
        if ( this.constructor === FireTile ) throw new Error("Não é possível instanciar FireTile diretamente. Crie uma subclasse.");
        this.#direction = direction;
    }

    start ( ) {
        this.#active = true;
    }

    /**
    * Validar o impacto da FireTile. Esta função é chamada a cada 500ms pelo motor do jogo.
    * Caso retorne true, a FireTile é removida do jogo.
    * Implementar nas subclasses.
    */

    validateImpact ( instrucao ) {  //ele tem de ler a direcao e sentido do disparo
   
        /*let haObstaculo = this.motor.casasMestre.filter ( 
            function ( casa ) {
                if ( ( this.equals ( casa ) ) && !casa.sobreposicao )
                    return casa
            }
        )
        console.log ( haObstaculo )

        if ( this.position.equals ( haObstaculo ) )
            return true */
    } 

    update() {
        if(!this.#active) return;
        this.position = this.position.plus(this.#direction.asVector());
        if(this.validateImpact()) {
            this.#active = false;
            setTimeout(() => {
                this.#gui.removeImage(this);
            }, 150);
        }
    }
}

export default FireTile;
