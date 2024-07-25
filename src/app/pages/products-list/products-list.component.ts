import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { IProduct } from '../../shared/interfaces/products.interface';
import { Observable, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductDialogComponent } from '../../shared/components/add-edit-product-dialog/add-edit-product-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'cost', 'description', 'detail'];
  products$!: Observable<IProduct[]> 

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products$ = this.productsService.productsTableUbdate$.pipe(
      switchMap(() => {
        return this.productsService.getAllProducts();
      })
    );
  }

  openDialog(): void {
    this.dialog.open(AddEditProductDialogComponent, {

      width: '550px',
    });
  }
}
