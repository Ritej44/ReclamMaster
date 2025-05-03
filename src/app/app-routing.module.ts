import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { TachesComponent } from './taches/taches.component';
import { ParametreComponent } from './parametre/parametre.component';
import { GeneralsettingsComponent } from './generalsettings/generalsettings.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { SignupComponent } from './signup/signup.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ChatComponent } from './chat/chat.component';
import { DashbordAdminComponent } from './dashbord-admin/dashbord-admin.component';
import { ClientComponent } from './client/client.component';
import { IntervenantComponent } from './intervenant/intervenant.component';
import { AffectationIntervenantComponent } from './affectation-intervenant/affectation-intervenant.component';
import { LoginComponent } from './login/login.component';
import { AlltachesComponent } from './alltaches/alltaches.component';
import { ListeintervenantComponent } from './listeintervenant/listeintervenant.component';
import { HistoriqueIntervenantComponent } from './historique-intervenant/historique-intervenant.component';
import { DashboardIntervenantComponent } from './dashboard-intervenant/dashboard-intervenant.component';
import { ParametreAdminComponent } from './parametre/parametre-admin/parametre-admin.component';
import { ParametreClientComponent } from './parametre/parametre-client/parametre-client.component';
import { NotificationAdminComponent } from './notification-settings/notification-admin/notification-admin.component';
import { NotificationClientComponent } from './notification-settings/notification-client/notification-client.component';
import { SettingClientComponent } from './generalsettings/setting-client/setting-client.component';
import { SettingAdminComponent } from './generalsettings/setting-admin/setting-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent ,
  data: { animation: 'login' }},
  { path: 'signup', component: SignupComponent, 
  data: { animation: 'signup' }},
  { path: 'dashboard', component: DashbordComponent },
  { path: 'taches', component: TachesComponent },
  {path:'historique', component:HistoriqueComponent},
  {path:'chat',component:ChatComponent},
  {path : 'parametre' , component:ParametreComponent},
  {path : 'parametre-client', component:ParametreClientComponent},
  {path : 'parametre-admin', component:ParametreAdminComponent},
  {path : 'generalsettings', component:GeneralsettingsComponent },
  {path : 'setting-client', component:SettingClientComponent},
  {path : 'setting-admin', component:SettingAdminComponent},
  {path: 'notification-settings',component: NotificationSettingsComponent},
  {path: 'notification-admin',component:NotificationAdminComponent},
  {path: 'notification-client',component:NotificationClientComponent},
  {path: 'dashbord-admin',component:DashbordAdminComponent},
  {path:'client',component:ClientComponent},
  {path:'intervenant',component:IntervenantComponent},
  {path:'affectation-intervenant',component:AffectationIntervenantComponent},
  {path: 'alltaches',component:AlltachesComponent},
  {path:'listeintervenant',component:ListeintervenantComponent},
  {path:'historique-intervenant',component:HistoriqueIntervenantComponent},
  {path:'dashboard-intervenant',component:DashboardIntervenantComponent},
  {  path: 'dashbord-admin',component: DashbordAdminComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
