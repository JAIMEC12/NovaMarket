import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../../../../interfaces/private/cart.interface';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, CurrencyPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {
  data: Cart = inject(MAT_DIALOG_DATA);
  displayedColumns = ['title', 'price', 'quantity', 'subtotal'];
}
