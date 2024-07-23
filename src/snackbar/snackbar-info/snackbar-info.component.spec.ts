import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarInfoComponent } from './snackbar-info.component';

describe('SnackbarInfoComponent', () => {
  let component: SnackbarInfoComponent;
  let fixture: ComponentFixture<SnackbarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackbarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
