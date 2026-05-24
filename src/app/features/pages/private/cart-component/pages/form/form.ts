import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Cart, CartProduct } from '../../../../../interfaces/private/cart.interface';
import { Product } from '../../../../../interfaces/private/product.interface';
import { ProductService } from '../../../../../services/private/product/product.service';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  dialogRef = inject(MatDialogRef<Form>);
  data: Cart = inject(MAT_DIALOG_DATA);

  isEdit = false;
  availableProducts = signal<Product[]>([]);
  loadingProducts = signal(true);

  form = this.fb.group({
    userId: [null as number | null, [Validators.required, Validators.min(1)]],
    products: this.fb.array([]),
  });

  get productItems(): FormArray {
    return this.form.get('products') as FormArray;
  }

  ngOnInit() {
    this.isEdit = !!this.data;
    if (this.data) {
      this.form.patchValue({ userId: this.data.userId });
    }

    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        const products: Product[] = data.products ?? data;

        if (this.data?.products) {
          const ids = new Set(products.map((p) => Number(p.id)));
          this.data.products
            .filter((p) => !ids.has(Number(p.id)))
            .forEach((p) => products.push(p as unknown as Product));
        }

        this.availableProducts.set(products);
        this.loadingProducts.set(false);

        if (this.data) {
          this.data.products?.forEach((p) => this.addProduct(Number(p.id), p.quantity));
        } else {
          this.addProduct();
        }
      },
      error: () => {
        this.loadingProducts.set(false);
        this.addProduct();
      },
    });
  }

  addProduct(productId: number | null = null, quantity: number = 1) {
    this.productItems.push(
      this.fb.group({
        productId: [productId, Validators.required],
        quantity: [quantity, [Validators.required, Validators.min(1)]],
      }),
    );
  }

  removeProduct(index: number) {
    this.productItems.removeAt(index);
  }

  getProductById(id: number): Product | undefined {
    return this.availableProducts().find((p) => Number(p.id) === Number(id));
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { userId, products } = this.form.value as {
      userId: number;
      products: { productId: number; quantity: number }[];
    };

    const _Products: CartProduct[] = products.map((item) => {
      const product = this.getProductById(item.productId)!;
      return {
        id: product.id,
        quantity: item.quantity,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
      };
    });

    const total = _Products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discountedTotal = _Products.reduce(
      (sum, p) => sum + p.price * p.quantity * (1 - p.discountPercentage / 100),
      0,
    );
    const totalQuantity = _Products.reduce((sum, p) => sum + p.quantity, 0);

    const result = {
      userId,
      products: _Products,
      total,
      discountedTotal,
      totalQuantity,
      totalProducts: _Products.length,
    };

    this.dialogRef.close(result);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
