import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PecaDialogComponent } from './peca-dialog.component';

describe('PecaDialogComponent', () => {
  let component: PecaDialogComponent;
  let fixture: ComponentFixture<PecaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PecaDialogComponent]
    });
    fixture = TestBed.createComponent(PecaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
