import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../model/product';

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

  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    let query = { _page: index, _limit: size } as { name?: string; _page: number; _limit: number };
    if (name) query = { ...query, name };
    const params = new HttpParams({ fromObject: query });

    return this.httpClient
      .get<Product[]>(this.url, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const count = Number(response.headers.get('x-total-count') ?? '0');
          return {
            data: response.body ?? [],
            count,
          };
        })
      );
  }
}
