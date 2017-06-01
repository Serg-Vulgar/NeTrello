import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'prompt-dialog',
  template: `
    <form [formGroup]="promptForm" novalidate (ngSubmit)="confirm()">
      <md-input-container>
        <input mdInput placeholder="{{ message }}"
               formControlName="promptText"
               [maxlength]="maxLength"
               type="text"
               md-tooltip="Max length {{ maxLength }} symbols">
      </md-input-container>
      <div class="text-center">
        <button type="submit" color="primary" md-raised-button>
          {{ confirmText }}
        </button>
        <button type="button" md-button
                (click)="dialogRef.close()">Cancel
        </button>
      </div>
    </form>
  `,
  styles: ['form { min-width: 240px; }']
})

export class PromptDialog implements OnInit {
  promptForm: FormGroup;
  public maxLength: number;
  public message: string;
  public confirmText: string;

  constructor(public dialogRef: MdDialogRef<PromptDialog>,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.promptForm = this.fb.group({
      promptText: ['', [Validators.required]]
    });
  }

  confirm() {
    if (this.promptForm.valid) {
      let promptText = this.promptForm.getRawValue().promptText;
      if (promptText && /\S/.test(promptText)) {
        this.dialogRef.close(promptText.trim());
      }
    }
  }

}
