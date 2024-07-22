import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-add-dir',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './modal-add-dir.component.html',
  styleUrl: './modal-add-dir.component.scss',
})
export class ModalDirComponent {
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    this.formGroup = this._formBuilder.group({
      dir: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(400),
        ],
      ],
    });
  }

  getErrorForControl(controlName: string): string | null {
    const control = this.formGroup.get(controlName);
    if (control?.hasError('required') && control.touched) {
      return 'Este campo es requerido';
    }
    if (control?.errors?.['minlength']) {
      return 'El número minimo de caracteres es 3';
    }
    if (control?.errors?.['maxlength']) {
      return 'El número máximo de caracteres es 400';
    }
    return null;
  }

  buscar() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

  }
}
