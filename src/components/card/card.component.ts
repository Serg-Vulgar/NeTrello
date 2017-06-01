import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { CardInfoComponent } from './card-info/card-info.component';

@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() card: Object;

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  openCardInfo(e: Event) {
    this.dialog.open(CardInfoComponent, {
      data: this.card,
    })
  }

}
