import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAdminComponent } from './notification-admin.component';

describe('NotificationAdminComponent', () => {
  let component: NotificationAdminComponent;
  let fixture: ComponentFixture<NotificationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationAdminComponent]
    });
    fixture = TestBed.createComponent(NotificationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
