import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Column, Board } from '../../services/data.model';
import { DataService } from '../../services/data.service';
import { DialogsService } from '../dialog/dialog.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.scss']
})

export class BoardComponent implements OnInit {
  board: Board;
  addColumnForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private dataService: DataService,
              private dialogsService: DialogsService,
              private dragulaService: DragulaService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.getCurrentBoard(+params.id)
      });
    this.createForm();

    this.dragulaService.setOptions('column', {
      direction: 'horizontal',
      revertOnSpill: true,
      moves: (el: any, container: any, handle: any) => {
        return handle.className === 'header';
      }
    });

    this.dragulaService.drop.subscribe((value: any) => {
      if (value[0] === 'column') {
       return this.dataService.updateCurrentBoard();
      }
    });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('column');
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
          this.dataService.num = 20
          this.dataService.updateCurrentBoard();
        }
      });
  }

  getCurrentBoard(id: number) {
    let board = this.dataService.getCurrentBoard(id);
    if (board) {
      this.board = board;
    } else {
      this.router.navigate(['/start']);
    }
  }

}
