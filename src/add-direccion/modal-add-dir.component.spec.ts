import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  ModalDirComponent } from './modal-add-dir.component';

describe('ModalAddKeyComponent', () => {
  let component:  ModalDirComponent;
  let fixture: ComponentFixture< ModalDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent( ModalDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
