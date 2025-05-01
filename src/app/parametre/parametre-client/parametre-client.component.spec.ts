import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreClientComponent } from './parametre-client.component';

describe('ParametreClientComponent', () => {
  let component: ParametreClientComponent;
  let fixture: ComponentFixture<ParametreClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametreClientComponent]
    });
    fixture = TestBed.createComponent(ParametreClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
