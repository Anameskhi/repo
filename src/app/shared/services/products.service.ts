import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  onEditClick$ = new BehaviorSubject<boolean>(false);
  currentProductId$ = new BehaviorSubject<number>(0);
  productsTableUbdate$ = new BehaviorSubject<IProduct[]>([]);

  getAllProducts(): Observable<IProduct[]> {
    return this.get<IProduct[]>('items');
  }

  getCurrentProduct(id: number): Observable<IProduct> {
    return this.get<IProduct>(`items/${id}`);
  }

  addProduct(newProduct: any): Observable<any> {
    return this.post<any>('items', newProduct);
  }

  editProduct(id: number, form: IProduct): Observable<IProduct> {
    return this.put<IProduct>(`items/${id}`, form);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.delete<IProduct>(`items/${id}`);
  }
}
