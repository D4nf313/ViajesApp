import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarExitoComponent } from './snackbar-exito.component';

describe('SnackbarExitoComponent', () => {
  let component: SnackbarExitoComponent;
  let fixture: ComponentFixture<SnackbarExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarExitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackbarExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
