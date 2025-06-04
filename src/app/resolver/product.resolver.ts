import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

export const productResolver: ResolveFn<Product> = (route) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id')!;
  return productService.getById(id);
};
