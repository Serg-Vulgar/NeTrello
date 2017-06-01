import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Board } from '../../services/data.model';
import { DialogsService } from '../dialog/dialog.service';


@Component({
  selector: 'start-screen',
  templateUrl: 'start-screen.component.html',
  styleUrls: ['start-screen.component.scss']
})

export class StartScreenComponent implements OnInit {
  addBoardForm: FormGroup;
  boards: Array<Board>;

  constructor(private dataService: DataService,
              private router: Router,
              private fb: FormBuilder,
              private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.boards = this.dataService.boards;
    this.dataService.currentBoard = null;
    this.createForm();
  }

  createForm(): void {
    this.addBoardForm = this.fb.group({
      boardName: ['', [Validators.required]]
    });
  }

  addBoard() {


    this.dialogsService
      .prompt('Enter new board name', 'Add board', 50)
      .subscribe(res => {
        if (res) {
          let newBoard: Board = {
            id: Date.now(),
            name: res.toString(),
            columns: []
          };
          this.dataService.addBoard(newBoard);
          this.openBoard(newBoard.id);
          this.addBoardForm.reset();
        }
      });


    // if (this.addBoardForm.valid) {
    //   let boardName = this.addBoardForm.getRawValue().boardName;
    //   if (boardName && /\S/.test(boardName)) {
    //     let board: Board = {
    //       id: Date.now(),
    //       name: boardName,
    //       columns: []
    //     };
    //     this.dataService.addBoard(board);
    //     this.openBoard(board.id);
    //     this.addBoardForm.reset();
    //   }
    // }
  }

  openBoard(id: number) {
    this.router.navigate(['/board', id]);
  }

}
