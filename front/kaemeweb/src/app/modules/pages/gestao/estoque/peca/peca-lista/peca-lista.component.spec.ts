import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaListaComponent } from './peca-lista.component';

describe('PecaListaComponent', () => {
  let component: PecaListaComponent;
  let fixture: ComponentFixture<PecaListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PecaListaComponent]
    });
    fixture = TestBed.createComponent(PecaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
