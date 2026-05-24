import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product, ProductPayload } from '../../../../../interfaces/private/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<Form>);
  data: Product = inject(MAT_DIALOG_DATA);

  isEdit = false;

  form = this.fb.group({
    title: ['', Validators.required],
    brand: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    thumbnail: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value as ProductPayload);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
