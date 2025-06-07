import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../model/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRemoteService extends ProductService {
  private readonly url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  override getById(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  override getList(name: string | undefined, index: number, size: number, isShow: boolean): Observable<{ data: Product[]; count: number }> {
    let query: {
      _page: number;
      _per_page: number;
      name?: string;
      isShow: boolean;
    } = { _page: index, _per_page: size, isShow: isShow };

    if (name) query = { ...query, name };

    const params = new HttpParams({ fromObject: query });
    return this.httpClient
      .get<{ data: Product[]; items: number }>(this.url, { params })
      .pipe(map(({ data, items: count }) => ({ data, count })));
  }
}
