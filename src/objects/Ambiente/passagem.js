import ImageTile from "../../game/imageTile.js";
import Chave from "../Itens/chave.js";

class Passagem extends ImageTile {
    sobreposicao = true;
    tipo = "D/E";
    chave = null;

    constructor ( position, tipo, chave ) {
        super ( position );
        this.tipo = tipo;
        if ( chave instanceof Chave )
            this.chave = chave;
        if ( this.tipo === "D" )
            this.sobreposicao = false;
    }

    get image() {
        if ( ( this.tipo === "D" ) && ( this.chave instanceof Key ) ) {
            return "DoorClosed.png";
        } else if ( this.tipo = "D" && !this.aberta )  {
            return "DoorOpen.png";
        } else {
            return "DoorWay.png";
        }
    }
}

export default Passagem;