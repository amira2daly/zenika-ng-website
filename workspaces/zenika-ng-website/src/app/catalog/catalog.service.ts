import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from './product.types';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  products: Product[] = [];

  constructor(private apiService: ApiService) {
    this.fetch().subscribe(); // Auto-fetch products on service instantiation
  }

  fetch(): Observable<Product[]> {
    return this.apiService.getProducts().pipe(
      tap((products) => {
        this.products = products;
      })
    );
  }

  decreaseStock(productId: string): void {
    const productIndex = this.products.findIndex((product) => product.id === productId);
    if (productIndex !== -1 && this.products[productIndex].stock > 0) {
      this.products[productIndex].stock--;
    }
  }

  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  isStockEmpty(): boolean {
    return this.products.every((product) => product.stock === 0);
  }
}
