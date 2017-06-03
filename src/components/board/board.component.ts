import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Column, Board } from '../../services/data.model';
import { DataService } from '../../services/data.service';
import { DialogsService } from '../dialog/dialog.service';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss']
})

export class BoardComponent implements OnInit {
  board: Board;
  addColumnForm: FormGroup;
  editNameBlock = false;
  boardName: string;

  boardClassName: string;
  dueDate: any;
  options: SortablejsOptions = {
    group: 'columns',
    animation: 150,
    onEnd: (evt) => {
      this.dataService.updateCurrentBoard();
    },
  };

  colors = ['orange-400', 'blue-grey-500', 'lime-500', 'cyan-600'];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private dataService: DataService,
              private dialogsService: DialogsService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.getCurrentBoard(+params.id)
      });
    this.createForm();
  }

  createForm(): void {
    this.addColumnForm = this.fb.group({
      columnName: ['', [Validators.required]]
    });
  }

  addColumn() {
    this.dialogsService
      .prompt('Enter new column name', 'Add column', 50)
      .subscribe(res => {
        if (res) {
          let columnName = res.toString();
          this.board.columns.push({
            id: Date.now(),
            name: columnName,
            cards: []
          });
          this.dataService.updateCurrentBoard();
        }
      });
  }

  getCurrentBoard(id: number) {
    let board = this.dataService.getCurrentBoard(id);
    console.log(board);
    if (board) {
      this.board = board;
      this.boardName = this.board.name;
    } else {
      this.router.navigate(['/start']);
    }
  }

  editBoardName(e: Event,) {
    e.stopPropagation();
    this.editNameBlock = true;
  }

  saveBoardName() {
    if (this.boardName && /\S/.test(this.boardName)) {
      this.boardName = this.boardName.trim();
      this.board.name = this.boardName;
      this.dataService.updateCurrentBoard();
    } else {
      this.boardName = this.board.name;
    }
    this.editNameBlock = false
  }


  deleteCurrentBoard() {
    this.dialogsService
      .confirm('Are you sure you want to delete this board?', 'Yes, delete')
      .subscribe(res => {
        if (res) {
          this.dataService.deleteCurrentBoard();
          this.router.navigate(['/start']);
        }
      });
  }


  setBoardClass(color: string) {
    console.log(color);
    this.boardClassName = color;

  }
}
