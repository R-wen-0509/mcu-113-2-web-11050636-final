import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderForm } from '../interface/order-form';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../model/product';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShoppingItem } from '../model/shopping-item';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  readonly shoppingCartService = inject(ShoppingCartService);

  private readonly destroyRef = inject(DestroyRef);

  form = new FormGroup({
    name: new FormControl<string | null>(null, { validators: [Validators.required] }),
    address: new FormControl<string | null>(null, { validators: [Validators.required] }),
    phone: new FormControl<string | null>(null, { validators: [Validators.required] }),
    details: new FormArray<FormGroup<OrderForm>>([]),
  });

  get name(): FormControl<string | null> {
    return this.form.get('name') as FormControl<string | null>;
  }

  get address(): FormControl<string | null> {
    return this.form.get('address') as FormControl<string | null>;
  }

  get phone(): FormControl<string | null> {
    return this.form.get('phone') as FormControl<string | null>;
  }

  get details(): FormArray<FormGroup<OrderForm>> {
    return this.form.get('details') as FormArray<FormGroup<OrderForm>>;
  }

  totalPrice = 0;

  ngOnInit(): void {
    this.setOrderDetail();
    this.setupTotalPriceCalculation();

    this.details.valueChanges.subscribe((value) => (this.shoppingCartService.data = value as ShoppingItem[]));
  }

  setOrderDetail() {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<OrderForm>({
        id: new FormControl<number>(item.id, { nonNullable: true }),
        product: new FormControl<Product>(item.product, { nonNullable: true }),
        count: new FormControl<number>(item.count, { nonNullable: true }),
        price: new FormControl<number>(item.product.price * item.count, { nonNullable: true }),
      });

      control
        .get('count')
        ?.valueChanges.pipe(
          filter((value) => value !== null),
          map((value) => value * item.product.price),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((price) => control.get('price')?.setValue(price, { emitEvent: false }));

      this.details.push(control);
    }
  }

  setupTotalPriceCalculation(): void {
    this.details.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.totalPrice = value.reduce((sum, { price }) => {
        return sum + (price ?? 0);
      }, 0);
      this.totalPrice = this.details.getRawValue().reduce((sum, { price }) => {
        return sum + (price ?? 0);
      }, 0);
    });
    this.totalPrice = this.details.getRawValue().reduce((sum, { price }) => {
      return sum + (price ?? 0);
    }, 0);
  }

  onRemoveItem(index: number): void {
    const itemToRemove = this.details.at(index).getRawValue();
    if (itemToRemove.id) {
      this.shoppingCartService.removeItem(itemToRemove.id);
      this.details.removeAt(index);
    }

    this.details.controls.forEach((control, idx) => {
      if (control instanceof FormGroup && control.get('id')) {
        control.get('id')?.setValue(idx + 1);
      }
    });
  }

  onSave(): void {
    console.log('Save');
  }
}
