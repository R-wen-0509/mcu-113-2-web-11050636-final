import { Injectable } from '@angular/core';
import { delay, filter, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _data: Product[] = [
    new Product({
      id: '1',
      name: 'A 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '2',
      name: 'B 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '3',
      name: 'C 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '4',
      name: 'D 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '5',
      name: 'E 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '6',
      name: 'F 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '7',
      name: 'G 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '8',
      name: 'H 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '9',
      name: 'I 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
    new Product({
      id: '10',
      name: 'J 產品',
      authors: ['作者A', '作者B', '作者C'],
      company: '博碩文化',
      photoUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      price: 1580,
    }),
  ];

  getById(productId: string): Observable<Product> {
    return of(this._data).pipe(
      mergeMap((data) => data),
      filter(({ id }) => id === productId)
    );
  }

  getList(name: string | undefined, index: number, size: number, isShow?: boolean): Observable<{ data: Product[]; count: number }> {
    return of(this._data).pipe(
      mergeMap((data) => data),
      filter((item) => (name ? item.name === name : true)),
      filter((item) => (isShow !== undefined ? item.isShow === isShow : true)),
      toArray(),
      map((data) => {
        const startIndex = (index - 1) * size;
        const endIndex = startIndex + size;
        return { data: data.slice(startIndex, endIndex), count: data.length };
      }),
      delay(500)
    );
  }
}
