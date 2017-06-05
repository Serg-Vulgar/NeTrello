import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  template: `
    <p>{{ message }}</p>
    <div class="text-center">
      <button type="button" color="warn" md-raised-button
              (click)="dialogRef.close(true); stopProp($event)">{{ confirmText }}
      </button>
      <button type="button" md-button
              (click)="dialogRef.close(); stopProp($event)">Cancel
      </button>
    </div>

  `,
})
export class ConfirmDialog {

  public message: string;
  public confirmText: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

  }

  stopProp(e: Event) {
    e.stopPropagation();
  }
}
