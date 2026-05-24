import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/public/product.service';
import { Product } from '../../../interfaces/public/public.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-home-component',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);

  loading = signal(false);
  error = signal<string | null>(null);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService.getProductsLimit(8).subscribe({
      next: (data: any) => {
        this.products.set(data.products);
        console.log(data);
        this.loading.set(false);
      },

      error: (err) => {
        this.error.set('Error al cargar los productos.');
        this.loading.set(false);
      },
    });
  }
}
