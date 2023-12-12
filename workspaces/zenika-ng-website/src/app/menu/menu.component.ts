import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  protected get numberOfBasketItems(): number {
    return this.basketService.items.length;
  }

  constructor(private basketService: BasketService) {}
}
