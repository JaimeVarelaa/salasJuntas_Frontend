import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletadoComponent } from './completado.component';

describe('CompletadoComponent', () => {
  let component: CompletadoComponent;
  let fixture: ComponentFixture<CompletadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletadoComponent]
    });
    fixture = TestBed.createComponent(CompletadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
