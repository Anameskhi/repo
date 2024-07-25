import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../services/products.service';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProfilePairDialogComponent } from '../add-profile-pair-dialog/add-profile-pair-dialog.component';

@Component({
  selector: 'app-add-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrls: ['./add-edit-product-dialog.component.scss'],
})
export class AddEditProductDialogComponent implements OnInit {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  onEdit: boolean = false;
  isSKUReadOnly: boolean = true; 
  editKey: string | null = null;
  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    cost: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    profile: new FormGroup({
      type: new FormControl('furniture', Validators.required),
      available: new FormControl(true, Validators.required),
      backlog: new FormControl(null, Validators.required),
      customPairs: new FormGroup({})
    }),
  });

  constructor(
    private productsService: ProductsService,
    private ngToastService: NgToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
    this.initializeCustomPairs();
    this.onEditClick();
  }

  initializeCustomPairs() {
    const customPairs = this.data?.profile?.customPairs;
    if (customPairs) {
      const customPairsFormGroup = this.productForm.get('profile.customPairs') as FormGroup;
      for (const key in customPairs) {
        if (customPairs.hasOwnProperty(key)) {
          customPairsFormGroup.addControl(key, new FormControl(customPairs[key], Validators.required));
        }
      }
    }
  }

  onEditClick() {
    this.productsService.onEditClick$.subscribe((res) => (this.onEdit = res));
  }

  onSubmit(): void {
    if (this.onEdit) {
      this.productsService
        .editProduct(this.data.id, this.productForm.value)
        .subscribe((res) => {
          this.productsService.productsTableUbdate$.next([]);
          this.ngToastService.success({
            detail: 'Success Message',
            summary: 'Product edited successfully',
          });
          this.dialog.closeAll();
          this.router.navigate(['/products-list']);
        });
    } else {
      this.productsService
        .addProduct(this.productForm.value)
        .subscribe((res) => {
          this.productsService.productsTableUbdate$.next([]);
          this.ngToastService.success({
            detail: 'Success Message',
            summary: 'Product added successfully',
          });
          this.dialog.closeAll();
        });
    }
  }
  openAddProfilePairDialog(key?: string, value?: string): void {
    const dialogRef = this.dialog.open(AddProfilePairDialogComponent, {
      width: '250px',
      data: { key, value, isEdit: !!key } // Pass additional data to indicate edit mode
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // Add logging for debugging
      if (result) {
        if (result.key && !!key) {
          // Update the existing key-value pair
          this.updateProfilePair(result.key, result.value);
        } else {
          // Add a new profile pair
          this.addProfilePair(result.key, result.value);
        }
      }
    });
  }

  addProfilePair(key: string, value: string): void {
    const customPairsFormGroup = this.productForm.get('profile.customPairs') as FormGroup;

    // Check if the key already exists
    if (customPairsFormGroup.get(key)) {
      // If it exists, update the value
      customPairsFormGroup.get(key)?.setValue(value);
    } else {
      // If it doesn't exist, add a new control
      customPairsFormGroup.addControl(key, new FormControl(value, Validators.required));
    }
  }
  updateProfilePair(key: string, value: string): void {
    const customPairsFormGroup = this.productForm.get('profile.customPairs') as FormGroup;
    const existingControl = customPairsFormGroup.get(key);
  
    if (existingControl) {
      // Update the value of the existing key
      existingControl.setValue(value);
    }
  }

  editPair(key: string): void {
    const value = this.productForm.get('profile.customPairs')?.get(key)?.value;
    this.openAddProfilePairDialog(key, value);
  }

  deleteProfilePair(key: string): void {
    
    const customPairsFormGroup = this.productForm.get('profile.customPairs') as FormGroup;
    customPairsFormGroup.removeControl(key);
  }
  
}