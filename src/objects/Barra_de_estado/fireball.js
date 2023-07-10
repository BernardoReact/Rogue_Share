import FireTile from "../../game/firetile.js";

class Fireball extends FireTile {

    constructor ( position, direction ) {
        super ( position, direction );
    }

    get image ( ) {
        return "Fire.gif";
    }

}

export default Fireball;