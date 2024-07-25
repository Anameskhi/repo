import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdactsDetailComponent } from './prodacts-detail.component';

describe('ProdactsDetailComponent', () => {
  let component: ProdactsDetailComponent;
  let fixture: ComponentFixture<ProdactsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdactsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdactsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
