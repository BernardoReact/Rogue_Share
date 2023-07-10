import Interface from "../game/interface.js";
import Position from "./position.js";
import Floor from "../objects/Ambiente/floor.js";
import Wall from "../objects/Ambiente/wall.js";
import Passagem from "../objects/Ambiente/passagem.js"
import Hero from "../objects/Personagens/Jogavel/hero.js";
import BadGuy from "../objects/Personagens/Nao_Jogaveis/badguy.js";
import Bat from "../objects/Personagens/Nao_Jogaveis/bat.js";
import Skeleton from "../objects/Personagens/Nao_Jogaveis/skeleton.js";
import Thief from "../objects/Personagens/Nao_Jogaveis/thief.js";
import Meat from "../objects/Itens/carne.js";
import Chave from "../objects/Itens/chave.js";
import Espada from "../objects/Itens/espada.js";
import Hammer from "../objects/Itens/martelo.js";

class Room {
    sala = "room0";
    instrucoes = "";
    disposicao = "";
    gui = Interface.getInstance ( );
    casasChao = [ ];
    casasAmbiente = [ ];
    casasPersonagens = [ ];
    casasItens = [ ];

    static #instance;
    static getInstance ( ) {
        if ( Room.#instance === undefined ) {
            Room.#instance = new Room ( );
        }
        return Room.#instance;
    }

    constructor ( room ) {
        this.sala = room;
    
    //Separação das secções (instruções e disposição) do ficheiro de sala.
        this.instrucoes = this.sala.slice ( this.sala.indexOf ( "#" ), ( this.sala.lastIndexOf ( "#" ) + 1 ) );
        //Apesar de o tamanho da sala ser de 10 por 10 casas o tamanho do ecrã é de 10 por 11 casas.
        //Assim, os "números mágicos" representam um incremento para a construção da sala após as instruções, e abaixo da barra de estado. 
        this.disposicao = this.sala.slice ( ( this.sala.lastIndexOf ( "#" ) + 1 ) + 1 ); 
    
    //Construção do chão da sala.
        for ( let x = 0; x < 10; x++ ) {
            for ( let y = 0; y < 10; y++ ) {
                let position = new Position ( x, y );
                this.casasChao.push ( new Floor ( position ) );
            }
        }
        this.gui.addImages ( this.casasChao ); 

        //Separação das instruções e da disposição de sala.
        let disposicaoEmLinhas = this.disposicao.split ( "\n" ),
            instrucoesEmLinhas = this.instrucoes.split ( "\n" );
        
        //Construção do ambiente, personagens e itens da sala.
        for ( let x = 0; x < 10; x++ ) {
            for ( let y = 0; y < 10; y++ ) {
                let position = new Position ( x, y )
                switch ( disposicaoEmLinhas [ y ].charAt ( x ) ) {
                    //Ambiente
                    case "W" :
                        this.casasAmbiente.push ( new Wall ( position ) )
                        break;
                    case "0" :
                    case "1" :
                    case "2" :
                        this.casasAmbiente.push ( new Passagem ( position, /* tipo , chave */ ) )
                        break;    
                    //Personagens
                    case "H" :
                        this.casasPersonagens.unshift ( new Hero ( position ) )
                        break;
                    case "B" :
                        this.casasPersonagens.push ( new Bat ( position ) )
                        break;
                    case "G" :
                        this.casasPersonagens.push ( new BadGuy ( position ) )
                        break;
                    case "S" :
                        this.casasPersonagens.push ( new Skeleton ( position ) )
                        break;
                    case "T" :
                        this.casasPersonagens.push ( new Thief ( position ) )
                        break;
                    //Objectos
                    case "h" :
                        this.casasItens.push ( new Hammer ( position ) )
                        break;
                    case "m" :
                        this.casasItens.push ( new Meat ( position ) )
                        break;
                    case "k":
                        this.casasItens.push ( new Chave ( position ) )
                        break;
                }
            }
        }
        this.gui.addImages ( this.casasAmbiente );
        this.gui.addImages ( this.casasPersonagens );
        this.gui.addImages ( this.casasItens );
    }
}

export default Room