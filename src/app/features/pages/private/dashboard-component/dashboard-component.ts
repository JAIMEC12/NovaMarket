import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../../services/private/product/product.service';
import { CartService } from '../../../services/private/cart/cart.service';

@Component({
  selector: 'app-dashboard-component',
  imports: [MatCardModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  loading = signal(true);
  totalProducts = signal(0);
  totalCarts = signal(0);

  ngOnInit() {
    this.loadProductsData();
    this.loadCartsData();
  }

  loadProductsData() {
    this.loading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.totalProducts.set(data.total ?? data.products?.length ?? 0);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  loadCartsData() {
    this.loading.set(true);
    this.cartService.getAllCarts().subscribe({
      next: (data: any) => {
        this.totalCarts.set(data.total ?? data.carts?.length ?? 0);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
