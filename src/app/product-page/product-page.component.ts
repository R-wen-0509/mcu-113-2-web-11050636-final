import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-page',
  imports: [PaginationComponent, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  private router = inject(Router);

  private productService = inject(ProductService);

  pageIndex = 1;

  pageSize = 5;

  totalCount = 0;

  products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  onEdit(product: Product): void {
    this.router.navigate(['product', 'form', product.id]);
  }

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getList(undefined, this.pageIndex, this.pageSize).subscribe(({ data, count }) => {
      this.products = data;
      this.totalCount = count;
    });
  }
}
