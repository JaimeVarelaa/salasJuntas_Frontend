import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteComponent } from './pendiente.component';

describe('PendienteComponent', () => {
  let component: PendienteComponent;
  let fixture: ComponentFixture<PendienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendienteComponent]
    });
    fixture = TestBed.createComponent(PendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
