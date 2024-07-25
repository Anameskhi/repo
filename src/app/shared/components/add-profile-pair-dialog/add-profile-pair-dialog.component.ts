import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-profile-pair-dialog',
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
  templateUrl: './add-profile-pair-dialog.component.html',
  styleUrls: ['./add-profile-pair-dialog.component.scss']
})
export class AddProfilePairDialogComponent {
  addForm: FormGroup;
  isEdit: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddProfilePairDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.key; // Determine if in edit mode based on presence of key
    this.addForm = this.fb.group({
      key: [{ value: data.key || '', disabled: this.isEdit }, Validators.required],
      value: [data.value || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const formValue = this.addForm.value;
      if (this.isEdit) {
        this.dialogRef.close({ key: this.addForm.get('key')?.value, value: formValue.value });
      } else {
        this.dialogRef.close(formValue);
      }
    }
  }
}