let Board = new Array(3);
Board = [
    [1, 0, 1],
    [1, -1, -1],
    [0, -1, 1]
];

var elementBoard = function (Board) {
    for (var i = 0; i < 3; i++) {
        console.log(Board[i][0], Board[i][1], Board[i][2]);
        //console.log();
    }
};




let emptycells = {
    compwin: [],
    playerwin: [],
    empty: []
}

for (var row = 0; row < 3; row++){
    let rowsum = 0;
    let colsum = 0;
    let rowempty = []
    let colempty = []
    for (var col = 0; col < 3; col++){
        if (Board[row][col] === -1) {
            rowempty.push([row, col]);
        }
        if (Board[col][row] === -1) {
            colempty.push([col, row]);
        }
        rowsum += Board[row][col];
        colsum += Board[col][row];
    }
    if (rowsum === -1) {
        emptycells.compwin.push(rowempty[0]);
    }
    if (rowsum === 1 && rowempty.length > 0) {
        emptycells.playerwin.push(rowempty[0]);
    }
    if (colsum === -1) {
        emptycells.compwin.push(colempty[0]);
    }
    if (colsum === 1 && colempty.length > 0) {
        emptycells.playerwin.push(colempty[0]);
    }
    
    for (var i = 0; i < rowempty.length; i++){
        emptycells.empty.push(rowempty[i]);
    }
    for (var i = 0; i < colempty.length; i++){
        emptycells.empty.push(colempty[i]);
    }
}

row = 0
let dgnl1 = []
let dgnl2 = []
let dgnlsum1 = 0, dgnlsum2 = 0;
while (row < 3) {
    if (Board[row][row] === -1) {
        dgnl1.push([row, row]);
    }
    if (Board[row][2-row] === -1) {
        dgnl2.push([row, 2-row]);
    }
    dgnlsum1 += Board[row][row];
    dgnlsum2 += Board[row][2 - row];
    console.log(row);
    row++;
}

if (dgnlsum1 === -1) {
    emptycells.compwin.push(dgnl1[0]);
}
if (dgnlsum1 === 1 && dgnl1.length > 0) {
    emptycells.playerwin.push(dgnl1[0]);
}
if (dgnlsum2 === -1) {
    emptycells.compwin.push(dgnl2[0]);
}
if (dgnlsum2 === 1 && dgnl2.length > 0) {
    emptycells.playerwin.push(dgnl2[0]);
}

for (var i = 0; i < dgnl1.length; i++){
    emptycells.empty.push(dgnl1[i]);
}
for (var i = 0; i < dgnl2.length; i++){
    emptycells.empty.push(dgnl2[i]);
}

elementBoard(Board);
console.log(emptycells);