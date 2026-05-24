import { Component, inject, OnInit, signal} from '@angular/core';
import { ProductService } from '../../../services/public/product.service';
import { Product } from '../../../interfaces/public/public.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-products-component',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})

export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService);
  products = signal<Product[]>([]);
  loading = signal(false);
  error = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
      this.loading.set(true);
      this._productService.getAllProducts().subscribe({
          next: (data: any) => {
                    console.log('data: ', data);
            this.products.set(data.products); 
            this.loading.set(false); },
          error: () => this.loading.set(false),
      });
  }
}
