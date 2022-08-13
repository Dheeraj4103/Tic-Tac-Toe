import { winprobability } from './computer'; // module for AI to get value of next cell
import './style.css' // styling sheet 
const getwin = winprobability(); // get the win probability of computer

let lastvalue = 0; // lastvalue of symbol
let isformsubmit = false; // to check if user has submitted his form or not
let gameover = false; // flag for game over
let computer = false; // flag for computer as a player

const playbutton = document.getElementById('play-with-friend'); // two player game
const compplaybutton = document.getElementById('play-with-computer'); // computer game

// Factory function for Players
function Player(sym) {
    let name = "Player1";
    this.sym = sym;
    let status = false;

    return { name, sym, status };
}

// Closure function for game_ui, manupalate the UI 
let game_ui = (() => {
    const declare = document.getElementById('show-info');
    let div1 = document.getElementById('player1');
    let div2 = document.getElementById('player2');

    let showPlayer = (player, div) => {
        const showname = document.createElement('h3');
        showname.innerHTML = player.name;
        const showsym = document.createElement('h1');
        showsym.innerHTML = (player.sym === 0 ? 'O' : 'X');
        div.append(showname);
        div.append(showsym);
    };
    let showinfo = (info) => {

        declare.innerHTML = info;

        declare.style.display = block;
    }

    return { showinfo, showPlayer, declare, div1, div2 };
})();
const form = document.getElementById('form');
const compform = document.getElementById('form-computer');
const player1 = new Player(0);
const player2 = new Player(1);


// play with two players
playbutton.onclick = () => {
    form.style.display = "block";
    compplaybutton.style.display = 'none';
    playbutton.style.display = 'none';
};

// play with single player
compplaybutton.onclick = () => {
    compform.style.display = "block";
    compplaybutton.style.display = 'none';
    playbutton.style.display = 'none';
    computer = true;
};


const formsubmit = document.getElementById('submit');
const compformsubmit = document.getElementById('submit-computer');
formsubmit.onclick = () => {
    player1.name = form.elements[0].value;
    player2.name = form.elements[1].value;
    form.style.display = 'none';

    game_ui.showPlayer(player1, game_ui.div1);
    game_ui.div1.style.display = 'block';
    game_ui.showPlayer(player2, game_ui.div2);
    game_ui.div2.style.display = 'block';
    isformsubmit = true;
    game_ui.showinfo(`${player1.name}'s Turn`);
}
compformsubmit.onclick = () => {
    player1.name = compform.elements[0].value;
    player2.name = "Computer";
    compform.style.display = 'none';

    game_ui.showPlayer(player1, game_ui.div1);
    game_ui.div1.style.display = 'block';
    game_ui.showPlayer(player2, game_ui.div2);
    game_ui.div2.style.display = 'block';
    isformsubmit = true;
    game_ui.showinfo(`${player1.name}'s Turn`);
}
//console.log(player1, player2);

const reset = document.getElementById('reset');
reset.onclick = () => {
    location.reload();
}

let Board = new Array(3);
for (var i = 0; i < 3; i++) {
    Board[i] = new Array(3);
    for (var j = 0; j < 3; j++) {
        Board[i][j] = -1;
    }
};


var elementBoard = function (Board) {
    for (var i = 0; i < 3; i++) {
        console.log(Board[i][0], Board[i][1], Board[i][2]);
        //console.log();
    }
};

// gameboard manupalation
var gameBoard = (() => {
    let isempty = false;
    var setValue = function (i, j, blockid) {
        if (Board[i][j] === -1) {
            console.log(lastvalue, computer);
            Board[i][j] = lastvalue;
            blockid.innerHTML = (lastvalue === 0 ? '0' : 'X');
            elementBoard(Board);
            checkwin(player1);
            if (gameover) {
                return true;
            }
            checkwin(player2);

            lastvalue = lastvalue ^ 1;

            let player = (lastvalue === 0 ? player1 : player2);
            if (!gameover) {

                game_ui.showinfo(`${player.name}'s turn`);
            }
            return true;
        }
        else {
            game_ui.showinfo("This block in not empty !!");
            return false;
        }
    };
    var checkwin = (player) => {
        const sym = player.sym;
        isempty = false;
        console.log(sym);
        for (var row = 0; row < 3; row++) {
            let cntrow = 0, cntcol = 0;
            for (var col = 0; col < 3; col++) {
                if (Board[row][col] === sym) {
                    cntrow++;
                }
                if (Board[col][row] === sym) {
                    cntcol++;
                }
                if (Board[row][col] === -1 || Board[col][row] === -1) {
                    isempty = true;
                }
            }
            if (cntrow === 3 || cntcol === 3) {
                player.status = true;
                gameover = true;
                game_ui.showinfo(`${player.name} won !!!`);
                return;
            }
        }
        let cntdiagonal = 0;
        cntdiagonal += (Board[0][0] === sym ? 1 : 0);
        cntdiagonal += (Board[1][1] === sym ? 1 : 0);
        cntdiagonal += (Board[2][2] === sym ? 1 : 0);
        if (cntdiagonal === 3) {
            gameover = true;
            game_ui.showinfo(`${player.name} won !!!`);
            return;
        }
        console.log(cntdiagonal);
        cntdiagonal = 0;
        cntdiagonal += (Board[0][2] === sym ? 1 : 0);
        cntdiagonal += (Board[1][1] === sym ? 1 : 0);
        cntdiagonal += (Board[2][0] === sym ? 1 : 0);
        if (cntdiagonal === 3) {
            gameover = true;
            game_ui.showinfo(`${player.name} won !!!`);
            return;
        }
        console.log(cntdiagonal);
        if (!isempty) {
            gameover = true;
            game_ui.showinfo("Match Tied !!!!");
            return;
        }
    };

    return { setValue };
})();




var block = document.getElementsByClassName('block');


function clickdiv(blockid) {
    if (!computer || (computer && lastvalue === 0)) {
        if (isformsubmit && !gameover) {
            let id = blockid.id;
            let i = id.charAt(2) - '0';
            let j = id.charAt(3) - '0';
            gameBoard.setValue(i, j, blockid);
            if (computer && lastvalue === 1) {
                setTimeout(() => {
                    const value = getwin.givecell(Board);
                    const compblock = document.getElementById(`bl${value[0]}${value[1]}`);
                    gameBoard.setValue(value[0], value[1], compblock);
                }, 2000);
            };
        }
        else if (!isformsubmit) {
            playbutton.style.display = 'none';
            game_ui.showinfo("First Enter Player Names.");
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}




block[0].onclick = () => { clickdiv(block[0]) };
block[1].onclick = () => { clickdiv(block[1]) };
block[2].onclick = () => { clickdiv(block[2]) };
block[3].onclick = () => { clickdiv(block[3]) };
block[4].onclick = () => { clickdiv(block[4]) };
block[5].onclick = () => { clickdiv(block[5]) };
block[6].onclick = () => { clickdiv(block[6]) };
block[7].onclick = () => { clickdiv(block[7]) };
block[8].onclick = () => { clickdiv(block[8]) };



// game_ui.div1.style.display = 'none';
// game_ui.div2.style.display = 'none'






