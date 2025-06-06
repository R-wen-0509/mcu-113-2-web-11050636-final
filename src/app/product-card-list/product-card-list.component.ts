import { Component, Input, input, output } from '@angular/core';

import { ProductCardComponent } from '../product-card/product-card.component';

import { PaginationComponent } from '../pagination/pagination.component';
import { Product } from '../model/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-card-list',
  imports: [PaginationComponent, ProductCardComponent, NgIf],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
})
export class ProductCardListComponent {
  readonly products = input<Product[]>([]);

  readonly edit = output<Product>();

  readonly remove = output<Product>();

  readonly view = output<Product>();

  pageIndex = 1;
}
