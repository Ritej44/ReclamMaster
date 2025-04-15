import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeintervenantComponent } from './listeintervenant.component';

describe('ListeintervenantComponent', () => {
  let component: ListeintervenantComponent;
  let fixture: ComponentFixture<ListeintervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeintervenantComponent]
    });
    fixture = TestBed.createComponent(ListeintervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
