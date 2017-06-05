import { Component, OnInit, Input } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { Column } from '../../services/data.model';
import { DataService } from '../../services/data.service';
import { DialogsService } from '../dialog/dialog.service';

@Component({
  selector: 'column',
  templateUrl: 'column.component.html',
  styleUrls: ['column.component.scss']
})

export class ColumnComponent implements OnInit {
  @Input() column: Column;

  addCardForm: FormGroup;
  addCardBlock = false;

  editNameBlock = false;
  columnName: string;

  options: SortablejsOptions = {
    group: 'cards',
    animation: 150,
    onEnd: (evt) => {
      this.dataService.updateCurrentBoard();
    },
  };

  detailsBlock = false;

  allTasks: number;
  doneTasks: number;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              public dialog: MdDialog,
              private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.createForm();
    this.columnName = this.column.name;
    this.getColumnInfo()
  }

  createForm(): void {
    this.addCardForm = this.fb.group({
      cardName: ['', [Validators.required]]
    });
  }

  openAddCardBlock(e: Event, el: any) {
    e.stopPropagation();
    this.addCardBlock = true;
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 100);
  }

  closeAddCardBlock() {
    this.addCardBlock = false;
    this.addCardForm.reset();
  }

  addCard() {
    if (this.addCardForm.valid) {
      let cardName = this.addCardForm.getRawValue().cardName;
      if (cardName && /\S/.test(cardName)) {
        this.column.cards.push({
          id: Date.now(),
          name: cardName,
          description: '',
          dueDate: null,
          comments: [],
          members: [],
          attachments: [],
          checkLists: []
        });
        this.dataService.updateCurrentBoard();
        this.closeAddCardBlock();
      }
    }
  }

  openDeleteDialog(e: Event) {
    this.dialogsService
      .confirm('Are you sure you want to delete this column?', 'Yes, delete')
      .subscribe(res => {
        if (res) {
          this.dataService.deleteColumn(this.column.id);
        }
      });
  }

  editColumndName(e: Event) {
    e.stopPropagation();
    this.editNameBlock = true;
  }

  saveColumnName() {
    if (this.columnName && /\S/.test(this.columnName)) {
      this.columnName = this.columnName.trim();
      this.column.name = this.columnName;
      this.dataService.updateCurrentBoard();
    } else {
      this.columnName = this.column.name;
    }
    this.editNameBlock = false
  }

  getColumnInfo() {
    this.allTasks = 0;
    this.doneTasks = 0;
    this.column.cards.forEach((card) => {
      if (card.checkLists.length) {
        card.checkLists.forEach((list) => {
          this.allTasks += list.items.length;
          this.doneTasks += list.items.filter((task: any) => {
            return task.done;
          }).length;
        })
      }
    });
  }

  toggleDetails() {
    this.detailsBlock = !this.detailsBlock;
  }

  closeCardHandler() {
    this.getColumnInfo();
  }

  deleteCardHandler(id: number) {
    this.column.cards = this.column.cards.filter((card) => {
      return card.id !== id;
    });
    this.dataService.updateCurrentBoard();
    this.getColumnInfo();
  }

}
