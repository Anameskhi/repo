import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-log-out-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './log-out-dialog.component.html',
  styleUrl: './log-out-dialog.component.scss',
})
export class LogOutDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogOutDialogComponent>,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {}

  onYesClick() {
    this.ngToastService.success({
      detail: 'Success Message',
      summary: 'User logged out successfully',
    });
    this.router.navigate(['/auth/login']);
  }
}
