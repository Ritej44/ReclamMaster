import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenantComponent } from './intervenant.component';

describe('IntervenantComponent', () => {
  let component: IntervenantComponent;
  let fixture: ComponentFixture<IntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervenantComponent]
    });
    fixture = TestBed.createComponent(IntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
