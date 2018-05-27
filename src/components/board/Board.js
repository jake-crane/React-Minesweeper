import React, { Component } from 'react';
import Row from '../row/Row';

const EMPTY_CELL = 0;
const MINE_CELL = 'M';

export default class Board extends Component {
    constructor() {
        super();
        this.state = {
            gameOver: false,
            rowCount: 16,
            colCount: 16,
            mineCount: 40,
            board: []
        };
    }
    componentDidMount() {
        this.initBoard();
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    }
    initBoard() {
        const board = this.createBoardArray();
        this.placeMines(board);
        this.setMineCounts(board);
        this.setState({ board });
    }
    createBoardArray() {
        const board = [];
        for (let i = 0; i < this.state.colCount; i++) {
            board[i] = [];
            for (let j = 0; j < this.state.rowCount; j++) 
                board[i][j] = {hidden: true, value: EMPTY_CELL};
        }
        return board;
    }
    placeMines(board) {
        for (let i = 0; i < this.state.mineCount; i++) {
            let randomRowIndex = this.getRandomNumber(0, this.state.rowCount - 1);
            let randomColIndex = this.getRandomNumber(0, this.state.colCount - 1);
            if (board[randomRowIndex][randomColIndex].value === MINE_CELL)
                i--;
            else
                board[randomRowIndex][randomColIndex].value = MINE_CELL;
        }
    }
    setMineCounts(board) {
        for (let i = 0; i < this.state.colCount; i++) {
            for (let j = 0; j < this.state.rowCount; j++) {
                if (board[i][j].value !== MINE_CELL)
                    board[i][j].value = this.calcSurroundingMineCount(i, j, board);
            }
        }
    }
    hasMine(row, col, board) {
        if (row < 0 || col < 0 || row > this.state.rowCount -1 || col > this.state.colCount -1)
            return 0;
        else
            return board[row][col].value === MINE_CELL ? 1 : 0;
    }
    calcSurroundingMineCount(row, col, board) {
        return this.hasMine(row - 1, col - 1, board) //upper left - -
        + this.hasMine(row - 1, col + 1, board) //upper right - +
        + this.hasMine(row + 1, col - 1, board) //lower left + -
        + this.hasMine(row + 1, col + 1, board) //lower right + +
        + this.hasMine(row, col - 1, board)     //left 0 -
        + this.hasMine(row, col + 1, board)     //right 0 +
        + this.hasMine(row - 1, col, board)     //above - 0
        + this.hasMine(row + 1, col, board);     //below + 0
    }
    checkandReveal(row, col) {
        if (this.state.gameOver || row < 0 || col < 0 || row > this.state.rowCount -1 || col > this.state.colCount -1 || !this.state.board[row][col].hidden)
            return;

        const board = this.state.board.slice(0);

        switch(this.state.board[row][col].value) {
            case MINE_CELL:
                board[row][col].hidden = false;
                this.setState({gameOver: true, board});
                console.log('Game over man');
                break;
            default:
                board[row][col].hidden = false;
                if (board[row][col].value === EMPTY_CELL)
                    this.revealSurroundingCells(row, col);
                this.setState({ board });
        }    
    }
    revealSurroundingCells(row, col) {
        this.checkandReveal(row - 1, col - 1); //upper left - -
        this.checkandReveal(row - 1, col + 1); //upper right - +
        this.checkandReveal(row + 1, col - 1); //lower left + -
        this.checkandReveal(row + 1, col + 1); //lower right + +
        this.checkandReveal(row, col - 1);     //left 0 -
        this.checkandReveal(row, col + 1);     //right 0 +
        this.checkandReveal(row - 1, col);     //above - 0
        this.checkandReveal(row + 1, col);     //below + 0
    }
    onCellClick(row, col) {
        this.checkandReveal(row, col);
    }
    reset() {
        this.initBoard();
        this.setState({gameOver: false});
    }
    render() {
        return (
        <div>
            {this.state.board.map((row, i) => <Row key={i} data={row} onCellClick={this.onCellClick.bind(this, i)}></Row>)}
            {this.state.gameOver && 
                <div>
                    <div>Game Over</div>
                    <button onClick={this.reset.bind(this)}>Play Again</button>
                    </div>
            }
        </div>
        );
    }
}
