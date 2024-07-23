import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarDangerComponent } from './snackbar-danger.component';

describe('SnackbarDangerComponent', () => {
  let component: SnackbarDangerComponent;
  let fixture: ComponentFixture<SnackbarDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarDangerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackbarDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
