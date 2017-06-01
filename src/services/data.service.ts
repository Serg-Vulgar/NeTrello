import { Injectable } from '@angular/core';
import { Board } from './data.model';

@Injectable()
export class DataService {
  appName = 'NeTrello';
// boards on start screen
  boards: Array<Board> = [];
//selected board(on board page)
  currentBoard: Board;

  num = 10;
  constructor() {
  }

  checkData() {
    this.boards = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`${this.appName}_B`)) {
        let item = localStorage.getItem(key);
        this.boards.push(JSON.parse(item));
      }
    });
  }

  addBoard(board: Board) {
    this.boards.push(board);
    localStorage.setItem(`${this.appName}_B${Date.now()}`, JSON.stringify(board));
  }

  updateCurrentBoard() {
    console.dir(this.num);
    localStorage.setItem(`${this.appName}_B${this.currentBoard.id}`, JSON.stringify(this.currentBoard));
  }

  getCurrentBoard(id: number): Board {
    let board = this.boards.filter((elem) => {
      if (elem.id === id) return elem;
    });
    this.currentBoard = board[0];
    return board[0];
  }

  deleteColumn(columnId: number) {
    this.currentBoard.columns = this.currentBoard.columns.filter((elem) => {
      return elem.id !== columnId;
    });
    this.updateCurrentBoard();
  }

}
