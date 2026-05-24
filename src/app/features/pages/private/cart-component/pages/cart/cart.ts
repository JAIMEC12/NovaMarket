import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyPipe } from '@angular/common';
import { Cart, CartPayload } from '../../../../../interfaces/private/cart.interface';
import { CartService } from '../../../../../services/private/cart/cart.service';
import { Form } from '../form/form';
import { Detail } from '../detail/detail';
import { ConfirmDialog } from '../../../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CurrencyPipe,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartsComponent implements OnInit {
  private cartService = inject(CartService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  carts = signal<Cart[]>([]);
  loading = signal(true);

  displayedColumns = [
    'userId',
    'totalProducts',
    'totalQuantity',
    'total',
    'discountedTotal',
    'actions',
  ];

  ngOnInit() {
    this.loadCarts();
  }

  loadCarts() {
    this.loading.set(true);
    this.cartService.getAllCarts().subscribe({
      next: (data: any) => {
        this.carts.set(data.carts);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  openCreate() {
    const ref = this.dialog.open(Form, { data: null, width: '560px' });
    ref.afterClosed().subscribe((result: Cart) => {
      if (!result) return;
      const payload: CartPayload = {
        userId: result.userId,
        products: result.products.map((p: any) => ({ id: p.id, quantity: p.quantity })),
      };
      this.cartService.createCart(payload).subscribe({
        next: (created) => {
          this.carts.update((list) => [...list, { ...result, id: created.id ?? Date.now() }]);
          this.snackBar.open('Carrito creado', 'Cerrar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 }),
      });
    });
  }

  openEdit(cart: Cart) {
    this.cartService.getCartById(cart.id).subscribe({
      next: (freshCart) => {
        const ref = this.dialog.open(Form, { data: freshCart, width: '560px' });
        ref.afterClosed().subscribe((result: Cart) => {
          if (!result) return;
          const payload: CartPayload = {
            userId: result.userId,
            products: result.products.map((p: any) => ({ id: p.id, quantity: p.quantity })),
          };
          this.cartService.updateCart(cart.id, payload).subscribe({
            next: () => {
              this.carts.update((list) =>
                list.map((c) => (c.id === cart.id ? { ...result, id: cart.id } : c)),
              );
              this.snackBar.open('Carrito actualizado', 'Cerrar', { duration: 3000 });
            },
            error: () => this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 }),
          });
        });
      },
      error: () => this.snackBar.open('Error al cargar el carrito', 'Cerrar', { duration: 3000 }),
    });
  }

  openDetail(cart: Cart) {
    this.dialog.open(Detail, { data: cart, width: '560px' });
  }

  delete(cart: Cart) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { title: 'Eliminar carrito', message: `¿Deseas eliminar el carrito #${cart.id}? Esta acción no se puede deshacer.` },
      width: '400px',
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.cartService.deleteCart(cart.id).subscribe({
        next: () => {
          this.carts.update((list) => list.filter((c) => c.id !== cart.id));
          this.snackBar.open('Carrito eliminado', 'Cerrar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 }),
      });
    });
  }
}
