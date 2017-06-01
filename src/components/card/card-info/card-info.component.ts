import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

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
              public dialogRef: MdDialogRef<CardInfoComponent>) {
  }

  ngOnInit() {
    this.card = this.data;
    console.log(this.card);
  }

  editName(name: string) {
    if (name && /\S/.test(name)) {
      this.card.name = name.trim();
    }
  }

  openDescriptionBlock(e: Event) {
    e.stopPropagation();
    this.descriptionBlock = true;
  }

  closeDescriptionBlock() {
    console.log('close dexcexce');
    this.descriptionBlock = false;
  }

  saveDescription() {
    if (this.description && /\S/.test(this.description)) {
      this.description = this.description.trim();
      this.card.description = this.description;
    } else {
      this.card.description = '';
    }
    this.closeDescriptionBlock();
  }

  sendComment() {
    if (this.comment && /\S/.test(this.comment)) {
      this.card.comments.push(this.comment.trim());
      this.comment = '';
    }
  }

  deleteComment(i: number) {
    this.card.comments.splice(i, 1);
  }

  addCheckList() {
    if (this.checkListName && /\S/.test(this.checkListName)) {
      this.card.checkLists.push({
        name: this.checkListName.trim(),
        items: []
      });
      this.checkListName = '';
    }
  }

  addCheckListItem(listIndex: number, input: HTMLInputElement) {
    let checkListItemName = input.value;
    if (checkListItemName && /\S/.test(checkListItemName)) {
      this.card.checkLists[listIndex].items.push({
        name: checkListItemName.trim(),
        checked: false
      });
    }
    input.value = '';
  }
}
