import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { DataService } from '../../../services/data.service';

import { CheckItem, CheckList } from '../../../services/data.model';
import { DialogsService } from '../../dialog/dialog.service';


@Component({
  selector: 'card-info',
  templateUrl: 'card-info.component.html',
  styleUrls: ['card-info.component.scss']
})

export class CardInfoComponent implements OnInit {
  card: any;
  descriptionBlock = false;
  description = '';
  comment = '';
  checkListName = '';

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              private dataService: DataService,
              private dialogsService: DialogsService,
              public dialogRef: MdDialogRef<CardInfoComponent>) {
  }

  ngOnInit() {
    this.card = this.data;
    console.log('CARD', this.card);
  }

  editName(name: string) {
    if (name && /\S/.test(name)) {
      this.card.name = name.trim();
      this.dataService.updateCurrentBoard();
    }
  }

  openDescriptionBlock(e: Event) {
    e.stopPropagation();
    this.descriptionBlock = true;
    this.description = this.card.description;
  }

  closeDescriptionBlock() {
    this.descriptionBlock = false;
  }

  saveDescription() {
    if (this.description && /\S/.test(this.description)) {
      this.description = this.description.trim();
      this.card.description = this.description;
    } else {
      this.card.description = '';
    }
    this.dataService.updateCurrentBoard();
    this.closeDescriptionBlock();
  }

  sendComment() {
    if (this.comment && /\S/.test(this.comment)) {
      this.card.comments.push(this.comment.trim());
      this.comment = '';
      this.dataService.updateCurrentBoard();
    }
  }

  deleteComment(i: number) {
    this.card.comments.splice(i, 1);
    this.dataService.updateCurrentBoard();
  }

  addCheckList() {
    if (this.checkListName && /\S/.test(this.checkListName)) {
      this.card.checkLists.push({
        name: this.checkListName.trim(),
        items: []
      });
      this.checkListName = '';
      this.dataService.updateCurrentBoard();
    }
  }

  deleteChecklist(i: number) {
    this.dialogsService
      .confirm('Are you sure you want to delete this check list?', 'Yes, delete')
      .subscribe(res => {
        if (res) {
          this.card.checkLists.splice(i, 1);
          this.dataService.updateCurrentBoard();
        }
      });
  }

  addCheckListItem(listIndex: number, input: HTMLInputElement) {
    let checkListItemName = input.value;
    if (checkListItemName && /\S/.test(checkListItemName)) {
      this.card.checkLists[listIndex].items.push({
        name: checkListItemName.trim(),
        done: false
      });
    }
    input.value = '';
    this.dataService.updateCurrentBoard();
  }

  deleteaddCheckListItem(checkList: CheckList, i: number) {
    checkList.items.splice(i, 1);
    this.dataService.updateCurrentBoard();
  }


  checkOnListItem(item: CheckItem) {
    item.done = !item.done;
    this.dataService.updateCurrentBoard();
  }

  getDonePercent(checkList: CheckList) {
    if (checkList.items.length) {
      let doneItems = checkList.items.filter((item) => {
        return item.done === true;
      });
      return (doneItems.length * 100 / checkList.items.length).toFixed();
    } else {
      return 0;
    }
  }

  changeDate(date: any) {
    this.card.dueDate = Date.parse(date);
    this.dataService.updateCurrentBoard();
  }

  cancelDueDate(p: any, dateInput: HTMLInputElement) {
    p._selected = null;
    dateInput.value = '';
    this.card.dueDate = null;
    this.dataService.updateCurrentBoard();
  }
}
