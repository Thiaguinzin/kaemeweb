import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormComponent } from './cliente-form.component';

describe('ClienteComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteFormComponent]
    });
    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});