import { Component, Inject, inject } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-snackbar-danger",
  standalone: true,
  imports: [],
  templateUrl: "./snackbar-danger.component.html",
  styleUrl: "./snackbar-danger.component.scss",
})
export class SnackbarDangerComponent {
  message: string;
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data;
  }
}
