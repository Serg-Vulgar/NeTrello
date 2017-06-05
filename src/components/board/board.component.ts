import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Board } from '../../services/data.model';
import { DataService } from '../../services/data.service';
import { DialogsService } from '../dialog/dialog.service';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss']
})

export class BoardComponent implements OnInit, AfterViewInit {
  board: Board;
  addColumnForm: FormGroup;
  editNameBlock = false;
  boardName: string;
  content: any;
  dueDate: any;

  options: SortablejsOptions = {
    group: 'columns',
    handle: '.column-name',
    animation: 150,
    onEnd: (evt) => {
      this.dataService.updateCurrentBoard();
    },
  };
  boardThemes: Array<number> = [];

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
    this.createThemesIndexes();
  }

  ngAfterViewInit() {
    this.addScrollBoardListeners();
  }

  addScrollBoardListeners() {
    if (this.board && this.board.columns.length) {
      // scroll on drag
      let down = false;
      let scrollLeft = 0;
      let x = 0;
      let mouseDownListener = (e: Event) => {
        down = true;
        scrollLeft = content.scrollLeft;
        x = e['clientX'];
      };
      let mouseUpListener = (e: Event) => {
        down = false;
      };
      let mouseMoveListener = (e: Event) => {
        if (down) {
          content.scrollLeft = scrollLeft + x - e['clientX'];
        }
      };
      let stopPropListener = (e: Event) => {
        e.stopPropagation()
      };
      let content = document.querySelector('.columns');
      let columns = document.querySelectorAll('.columns .column');
      Array.prototype.forEach.call(columns, (column: any) => {
        column.removeEventListener('mousedown', stopPropListener);
        column.addEventListener('mousedown', stopPropListener);
      });

      content.removeEventListener('mousedown', mouseDownListener);
      content.removeEventListener('mouseup', mouseUpListener);
      content.removeEventListener('mouseleave', mouseUpListener);
      content.removeEventListener('mousemove', mouseMoveListener);
      content.addEventListener('mousedown', mouseDownListener);
      content.addEventListener('mouseup', mouseUpListener);
      content.addEventListener('mouseleave', mouseUpListener);
      content.addEventListener('mousemove', mouseMoveListener);
    }
  }

  createThemesIndexes() {
    let i = 0;
    while (i <= 14) {
      this.boardThemes.push(i);
      i++;
    }
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
          setTimeout(() => {
            let columns = document.querySelector('.columns');
            columns.scrollLeft = columns.scrollWidth;
            this.addScrollBoardListeners();
          }, 100);
        }
      });
  }

  getCurrentBoard(id: number) {
    let board = this.dataService.getCurrentBoard(id);
    if (board) {
      this.board = board;
      this.boardName = this.board.name;
    } else {
      this.router.navigate(['/start']);
    }
  }

  editBoardName(e: Event) {
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

  setBoardTheme(theme: number) {
    if (this.board.boardTheme !== theme) {
      this.board.boardTheme = theme;
      this.dataService.updateCurrentBoard();
    }
  }

  openSidenav(e: Event, sidenav: any) {
    e.stopPropagation();
    sidenav.open();
  }

}
