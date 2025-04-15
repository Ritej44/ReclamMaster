import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIntervenantComponent } from './dashboard-intervenant.component';

describe('DashboardIntervenantComponent', () => {
  let component: DashboardIntervenantComponent;
  let fixture: ComponentFixture<DashboardIntervenantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardIntervenantComponent]
    });
    fixture = TestBed.createComponent(DashboardIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
