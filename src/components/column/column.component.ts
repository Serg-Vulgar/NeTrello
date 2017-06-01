import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

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

  newCardButtons = false;

  options: SortablejsOptions = {
    group: {
      name: 'cards',
      pull: true,
      push: true
    },
    sort: true,
    // ghostClass: 'sortable-ghost',
    // chosenClass: 'sortable-chosen',
    animation: 200,
    // onRemove: (event: any) => {
    //   console.log(this.column.cards);
    //   if (!this.column.cards.length) {
    //     this.column.cards = [{
    //       name: '',
    //       id: 0
    //     }];
    //   }
    // }
  };

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              public dialog: MdDialog,
              private dialogsService: DialogsService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.addCardForm = this.fb.group({
      cardName: ['', [Validators.required]]
    });
  }

  openAddCardBlock(e: Event) {
    e.stopPropagation();
    this.addCardBlock = true;
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
          comments: [],
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

  showButtons() {
    this.newCardButtons = true
  }

  hideButtons() {
    this.newCardButtons = false;
  }

}
