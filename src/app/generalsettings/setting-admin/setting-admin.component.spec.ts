import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAdminComponent } from './setting-admin.component';

describe('SettingAdminComponent', () => {
  let component: SettingAdminComponent;
  let fixture: ComponentFixture<SettingAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingAdminComponent]
    });
    fixture = TestBed.createComponent(SettingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
