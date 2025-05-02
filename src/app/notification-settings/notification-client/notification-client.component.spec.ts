import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationClientComponent } from './notification-client.component';

describe('NotificationClientComponent', () => {
  let component: NotificationClientComponent;
  let fixture: ComponentFixture<NotificationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationClientComponent]
    });
    fixture = TestBed.createComponent(NotificationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
