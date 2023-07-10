import Arma from "./item.js";

class Espada extends Arma {
    valorAtaque = 2;

    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "Sword.png";
    }
}

export default Espada;