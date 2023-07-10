import Arma from "./item.js";

class Hammer extends Arma {
    valorAtaque = 4;

    constructor ( position ) {
        super ( position );
    }
    get image() {
        return "Hammer.png";
    }
}

export default Hammer;