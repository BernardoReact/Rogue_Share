import Item from "./item.js";

class Arma extends Item {
    valorAtaque = 0;

    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "";
    }
}

export default Arma;