import { Component, Inject, inject } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-snackbar-exito",
  standalone: true,
  imports: [],
  templateUrl: "./snackbar-exito.component.html",
  styleUrl: "./snackbar-exito.component.scss",
})
export class SnackbarExitoComponent {
  message: string;
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data;
    
  }
}
