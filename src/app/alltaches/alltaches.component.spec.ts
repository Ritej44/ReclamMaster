import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltachesComponent } from './alltaches.component';

describe('AlltachesComponent', () => {
  let component: AlltachesComponent;
  let fixture: ComponentFixture<AlltachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlltachesComponent]
    });
    fixture = TestBed.createComponent(AlltachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
