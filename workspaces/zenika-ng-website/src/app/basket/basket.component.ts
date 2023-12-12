import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service'; // Import du service BasketService
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected basketItems: BasketItem[] = [];
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  constructor(
    private basketService: BasketService, // Injection de BasketService
    private router: Router,
  ) {
    // Utilisation de BasketService pour récupérer les éléments du panier
    this.basketService.fetch().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected get basketTotal(): number {
    return this.basketService.total; // Utilisation de la propriété 'total' de BasketService
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => {
      this.basketItems = [];
      this.router.navigate(['']);
    });
  }
}
