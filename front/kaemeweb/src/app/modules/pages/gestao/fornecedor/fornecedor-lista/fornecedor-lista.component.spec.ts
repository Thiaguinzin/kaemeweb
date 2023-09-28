import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorListaComponent } from './fornecedor-lista.component';

describe('FornecedorListaComponent', () => {
  let component: FornecedorListaComponent;
  let fixture: ComponentFixture<FornecedorListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorListaComponent]
    });
    fixture = TestBed.createComponent(FornecedorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
