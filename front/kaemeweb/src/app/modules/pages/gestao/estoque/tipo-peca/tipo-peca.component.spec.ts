import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPecaComponent } from './tipo-peca.component';

describe('TipoPecaComponent', () => {
  let component: TipoPecaComponent;
  let fixture: ComponentFixture<TipoPecaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoPecaComponent]
    });
    fixture = TestBed.createComponent(TipoPecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
