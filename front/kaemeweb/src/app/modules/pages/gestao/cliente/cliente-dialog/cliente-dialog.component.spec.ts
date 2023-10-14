import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDialogComponent } from './cliente-dialog.component';

describe('ClienteDialogComponent', () => {
  let component: ClienteDialogComponent;
  let fixture: ComponentFixture<ClienteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteDialogComponent]
    });
    fixture = TestBed.createComponent(ClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
