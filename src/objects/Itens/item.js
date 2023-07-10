import ImageTile from "../../game/imageTile.js";

class Item extends ImageTile {
    
    constructor ( position ) {
        super ( position );
    }

    get image() {
        return "";
    }
}

export default Item;