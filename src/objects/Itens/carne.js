import Item from "./item.js";

class Meat extends Item {
    
    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "Meat.png";
    }
}

export default Meat;