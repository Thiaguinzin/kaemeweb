import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaFormComponent } from './peca-form.component';

describe('PecaFormComponent', () => {
  let component: PecaFormComponent;
  let fixture: ComponentFixture<PecaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PecaFormComponent]
    });
    fixture = TestBed.createComponent(PecaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
