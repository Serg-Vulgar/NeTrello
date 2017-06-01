import { Observable } from 'rxjs/Rx';
import { ConfirmDialog } from './confirm-dialog.component';
import { PromptDialog } from './prompt-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) {
  }

  public confirm(message: string, confirmText: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialog>;

    dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.confirmText = confirmText;

    return dialogRef.afterClosed();
  }


  public prompt(message: string, confirmText: string, maxLength?: number): Observable<boolean> {

    let dialogRef: MdDialogRef<PromptDialog>;

    dialogRef = this.dialog.open(PromptDialog);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.confirmText = confirmText;
    dialogRef.componentInstance.maxLength = maxLength;

    return dialogRef.afterClosed();
  }

}
