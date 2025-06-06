import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  form = new FormGroup({
    name: new FormControl<string | null>(null),
    address: new FormControl<string | null>(null),
    phone: new FormControl<string | null>(null),
  });
}
