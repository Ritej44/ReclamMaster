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
import { AuthGuard } from './AuthGuard.service';
import { LoginComponent } from './login/login.component';
import { AlltachesComponent } from './alltaches/alltaches.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashbordComponent },
  { path: 'taches', component: TachesComponent },
  {path:'historique', component:HistoriqueComponent},
  {path:'chat',component:ChatComponent},
  {path : 'parametre' , component:ParametreComponent},
  {path : 'generalsettings', component:GeneralsettingsComponent },
  {path: 'notification-settings',component: NotificationSettingsComponent},
  {path: 'dashbord-admin',component:DashbordAdminComponent},
  {path:'client',component:ClientComponent},
  {path:'intervenant',component:IntervenantComponent},
  {path:'affectation-intervenant',component:AffectationIntervenantComponent},
  {path: 'alltaches',component:AlltachesComponent},
  {  path: 'dashbord-admin',
    component: DashbordAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }  },
    { 
      path: 'intervenant', 
      component: IntervenantComponent,
      canActivate: [AuthGuard],
      data: { roles: ['intervenant', 'admin'] } 
    },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
