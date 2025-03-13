import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


interface NotificationSettings {
  newClaims: { push: boolean; email: boolean };
  claimUpdates: { push: boolean; email: boolean };
  managerReplies: { push: boolean; email: boolean };
  claimReminders: { push: boolean; email: boolean };
}


@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent {
  notificationSettings: NotificationSettings = {
    newClaims: { push: false, email: false },
    claimUpdates: { push: false, email: false },
    managerReplies: { push: false, email: false },
    claimReminders: { push: false, email: false }
  };

  saveSettings() {
    // Logic to save settings, e.g., API call
    console.log('Notification settings saved:', this.notificationSettings);
  }

constructor(private authService:AuthService,private router:Router){}

  logout():void {
    this.authService.logout();

    this.router.navigate(['/login']);  }
}

