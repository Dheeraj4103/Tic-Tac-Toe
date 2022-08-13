


const winprobability = (
    () => {
        let emptycells = {
            compwin: [],
            playerwin: [],
            empty: []
        };

        const putemptycells = (emptycells, rowempty, colempty, rowsum, colsum) => {
            if (rowsum === -1 && rowempty.length === 1) {
                emptycells.compwin.push(rowempty[0]);
            }
            if (rowsum === 1 && rowempty.length === 1) {
                emptycells.playerwin.push(rowempty[0]);
            }
            if (colsum === -1 && colempty.length === 1) {
                emptycells.compwin.push(colempty[0]);
            }
            if (colsum === 1 && colempty.length === 1) {
                emptycells.playerwin.push(colempty[0]);
            }

            for (var i = 0; i < rowempty.length; i++) {
                emptycells.empty.push(rowempty[i]);
            }
            for (var i = 0; i < colempty.length; i++) {
                emptycells.empty.push(colempty[i]);
            }
        }

        const findemptycells = (Board) => {

            for (var row = 0; row < 3; row++) {
                let rowsum = 0;
                let colsum = 0;
                let rowempty = []
                let colempty = []
                for (var col = 0; col < 3; col++) {
                    if (Board[row][col] === -1) {
                        rowempty.push([row, col]);
                    }
                    if (Board[col][row] === -1) {
                        colempty.push([col, row]);
                    }
                    rowsum += Board[row][col];
                    colsum += Board[col][row];
                }
                putemptycells(emptycells, rowempty, colempty, rowsum, colsum);
            }
            row = 0
            let dgnl1 = []
            let dgnl2 = []
            let dgnlsum1 = 0, dgnlsum2 = 0;
            while (row < 3) {
                if (Board[row][row] === -1) {
                    dgnl1.push([row, row]);
                }
                if (Board[row][2 - row] === -1) {
                    dgnl2.push([row, 2 - row]);
                }
                dgnlsum1 += Board[row][row];
                dgnlsum2 += Board[row][2 - row];
                row++;
            }

            putemptycells(emptycells, dgnl1, dgnl2, dgnlsum1, dgnlsum2);
        }

        const givecell = (Board) => {
            emptycells.compwin = []
            emptycells.playerwin = []
            emptycells.empty = []
            findemptycells(Board);
            if (emptycells.compwin.length != 0) {
                return emptycells.compwin[0];
            }
            else if (emptycells.playerwin.length != 0) {
                return emptycells.playerwin[0];
            }
            else {
                return emptycells.empty[0];
            }
        }

        return  {givecell, emptycells} ;
    }

);



export { winprobability };
