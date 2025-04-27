import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { TachesComponent } from './taches/taches.component';
import { ParametreComponent } from './parametre/parametre.component';
import { GeneralsettingsComponent } from './generalsettings/generalsettings.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { ClientComponent } from './client/client.component';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { AffectationIntervenantComponent } from './affectation-intervenant/affectation-intervenant.component';
import { AlltachesComponent } from './alltaches/alltaches.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ListeintervenantComponent } from './listeintervenant/listeintervenant.component';
import { HistoriqueIntervenantComponent } from './historique-intervenant/historique-intervenant.component';
import { DashboardIntervenantComponent } from './dashboard-intervenant/dashboard-intervenant.component';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    TachesComponent,
    ParametreComponent,
    GeneralsettingsComponent,
    NotificationSettingsComponent,
    LoginComponent,
    SignupComponent,
    HistoriqueComponent,
    ChatComponent,
    DashbordAdminComponent,
    ClientComponent,
    IntervenantComponent,
    AffectationIntervenantComponent,
    AlltachesComponent,
    ListeintervenantComponent,
    HistoriqueIntervenantComponent,
    DashboardIntervenantComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonModule,
    BrowserAnimationsModule, 
    
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




/*
C:\Program Files\MongoDB\Server\7.0\bin
mongod --dbpath "C:\Program Files\MongoDB\Server\7.0\Data" --bind_ip 127.0.0.1

*/