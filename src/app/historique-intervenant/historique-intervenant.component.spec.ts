import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueIntervenantComponent } from './historique-intervenant.component';

describe('HistoriqueIntervenantComponent', () => {
  let component: HistoriqueIntervenantComponent;
  let fixture: ComponentFixture<HistoriqueIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueIntervenantComponent]
    });
    fixture = TestBed.createComponent(HistoriqueIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
