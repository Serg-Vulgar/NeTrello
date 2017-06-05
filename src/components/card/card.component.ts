import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Card } from '../../services/data.model';
import { CardInfoComponent } from './card-info/card-info.component';

@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output()
  deleteCard: EventEmitter<number> = new EventEmitter();
  @Output()
  closeCard: EventEmitter<boolean> = new EventEmitter();
  dueDateOver: boolean;

  allTasks: number;
  doneTasks: number;

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
    this.checkDueDate();
    setInterval(() => {
      this.checkDueDate();
    }, 60 * 1000);

    this.getCardInfo();
  }

  openCardInfo(e: Event) {
    let dialogRef = this.dialog.open(CardInfoComponent, {
      data: this.card,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCard.emit(this.card['id']);
      } else {
        this.closeCard.emit(true);
        this.checkDueDate();
        this.getCardInfo();
      }
    });
  }

  getCardInfo() {
    this.allTasks = 0;
    this.doneTasks = 0;

    if (this.card.checkLists.length) {
      this.card.checkLists.forEach((list) => {
        this.allTasks += list.items.length;
        this.doneTasks += list.items.filter((task: any) => {
          return task.done;
        }).length;
      })
    }
  }

  checkDueDate() {
    if (this.card['dueDate']) {
      this.dueDateOver = Date.now() > this.card['dueDate'];
    }
  }

}
