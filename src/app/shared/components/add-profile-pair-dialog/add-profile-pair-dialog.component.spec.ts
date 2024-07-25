import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilePairDialogComponent } from './add-profile-pair-dialog.component';

describe('AddProfilePairDialogComponent', () => {
  let component: AddProfilePairDialogComponent;
  let fixture: ComponentFixture<AddProfilePairDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProfilePairDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfilePairDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
