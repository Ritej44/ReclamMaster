import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationIntervenantComponent } from './affectation-intervenant.component';

describe('AffectationIntervenantComponent', () => {
  let component: AffectationIntervenantComponent;
  let fixture: ComponentFixture<AffectationIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationIntervenantComponent]
    });
    fixture = TestBed.createComponent(AffectationIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
