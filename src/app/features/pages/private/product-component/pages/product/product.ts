import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductPayload } from '../../../../../interfaces/private/product.interface';
import { ProductService } from '../../../../../services/private/product/product.service';
import { Form } from '../form/form';
import { ConfirmDialog } from '../../../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatButtonModule, 
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CurrencyPipe,
    SlicePipe,
    FormsModule,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  products = signal<Product[]>([]);
  loading = signal(true);
  searchTerm = signal('');
  categoryFilter = signal('');

  categories = computed(() => [...new Set(this.products().map((p) => p.category))].sort());

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const cat = this.categoryFilter();
    return this.products().filter(
      (p) => (!term || p.title.toLowerCase().includes(term)) && (!cat || p.category === cat),
    );
  });

  displayedColumns = ['thumbnail', 'title', 'description', 'category', 'price', 'stock', 'actions'];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  clearFilters() {
    this.searchTerm.set('');
    this.categoryFilter.set('');
  }

  openCreate() {
    const ref = this.dialog.open(Form, { data: null, width: '560px' });
    ref.afterClosed().subscribe((payload: ProductPayload) => {
      if (!payload) return;
      this.productService.createProduct(payload).subscribe({
        next: (created) => {
          this.products.update((list) => [...list, { ...created, id: Date.now() }]);
          this.snackBar.open('Producto creado', 'Cerrar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 }),
      });
    });
  }

  openEdit(product: Product) {
    const ref = this.dialog.open(Form, { data: product, width: '560px' });
    ref.afterClosed().subscribe((payload: ProductPayload) => {
      if (!payload) return;
      this.productService.updateProduct(product.id, payload).subscribe({
        next: (updated) => {
          this.products.update((list) =>
            list.map((p) => (p.id === product.id ? { ...updated, id: product.id } : p)),
          );
          this.snackBar.open('Producto actualizado', 'Cerrar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error al actualizar', 'Cerrar', { duration: 3000 }),
      });
    });
  }

  delete(product: Product) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { title: 'Eliminar producto', message: `¿Deseas eliminar "${product.title}"? Esta acción no se puede deshacer.` },
      width: '400px',
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.products.update((list) => list.filter((p) => p.id !== product.id));
          this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 3000 });
        },
        error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 }),
      });
    });
  }
}
