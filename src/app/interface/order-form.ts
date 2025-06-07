import { FormControl } from '@angular/forms';
import { Product } from '../model/product';

export interface OrderForm {
  id: FormControl<number>;
  product: FormControl<Product>;
  count: FormControl<number>;
  price: FormControl<number>;
}
