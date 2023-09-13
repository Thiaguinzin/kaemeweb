import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDefaultComponent } from './template-default.component';

describe('TemplateDefaultComponent', () => {
  let component: TemplateDefaultComponent;
  let fixture: ComponentFixture<TemplateDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateDefaultComponent]
    });
    fixture = TestBed.createComponent(TemplateDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
