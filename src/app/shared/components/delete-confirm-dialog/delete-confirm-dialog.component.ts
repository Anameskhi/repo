import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);

  currentProductId!: number;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private productsService: ProductsService,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.getCurrentUsersId();
  }

  getCurrentUsersId() {
    this.productsService.currentProductId$.subscribe(
      (res) => (this.currentProductId = res)
    );
  }

  onYesClick() {
    this.productsService
      .deleteProduct(this.currentProductId)
      .subscribe((res) => {
        this.ngToastService.success({
          detail: 'Success Message',
          summary: 'Product deleted successfully',
        });
        this.router.navigate(['/products-list']);
      });
  }
}
