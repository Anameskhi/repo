import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interfaces/products.interface';
import { Console } from 'console';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddEditProductDialogComponent } from '../../shared/components/add-edit-product-dialog/add-edit-product-dialog.component';

@Component({
  selector: 'app-prodacts-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './prodacts-detail.component.html',
  styleUrl: './prodacts-detail.component.scss',
})
export class ProdactsDetailComponent implements OnInit {
  currentProductId: number = this.activatedRoute.snapshot.params['id'];
  currentProduct?: IProduct;
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getCurrentProduct();
  }

  getCurrentProduct() {
    this.productsService
      .getCurrentProduct(this.currentProductId)
      .subscribe((res) => {
        this.currentProduct = res;
        console.log(res)
      });
    this.productsService.currentProductId$.next(this.currentProductId);
  }

  onEditClick(currentProduct?: IProduct) {
    this.dialog.open(AddEditProductDialogComponent, {
      data: {
        id: currentProduct?.id,
        name: currentProduct?.name,
        description: currentProduct?.description,
        sku: currentProduct?.sku,
        cost: currentProduct?.cost,

        profile: {
          type: currentProduct?.profile.type,
          avalable: currentProduct?.profile.available,
          backlog: currentProduct?.profile.backlog,
          customPairs: currentProduct?.profile.customPairs
        },
      },
    }).
    afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        this.productsService.editProduct(updatedProduct.id, updatedProduct)
          .subscribe(() => {
            this.getCurrentProduct(); // Reload product to reflect changes
          });
      }
    });
    this.productsService.onEditClick$.next(true);
  }

  openDialog(): void {
    this.dialog.open(DeleteConfirmDialogComponent, {
      width: '350px',
    });
  }
}
