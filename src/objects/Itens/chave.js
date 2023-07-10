import Item from "./item.js";

class Chave extends Item {
    
    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "Key.png";
    }
}

export default Chave;