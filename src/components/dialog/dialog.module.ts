import { DialogsService } from './dialog.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfirmDialog }   from './confirm-dialog.component';
import { PromptDialog }   from './prompt-dialog.component';

@NgModule({
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ConfirmDialog,
    PromptDialog
  ],
  declarations: [
    ConfirmDialog,
    PromptDialog
  ],
  providers: [
    DialogsService,
  ],
  entryComponents: [
    ConfirmDialog,
    PromptDialog
  ],
})
export class DialogModule {
}
