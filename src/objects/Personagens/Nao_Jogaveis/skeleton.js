import Inimigo from "./inimigoGeral.js";

class Skeleton extends Inimigo {
    vida = 5;
    pontos = 5;

    constructor(position) {
        super(position);
    }

    get image() {
        return "Skeleton.gif";
    }
}

export default Skeleton;