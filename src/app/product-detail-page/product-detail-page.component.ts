import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-detail-page',
  imports: [CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly product = input.required<Product>();

  readonly router = inject(Router);

  readonly shoppingCartService = inject(ShoppingCartService);

  onBack(): void {
    this.router.navigate(['products']);
  }

  addToCart(product: Product): void {
    this.shoppingCartService.addProduct(product);
  }
}
