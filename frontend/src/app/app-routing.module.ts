import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { SignupComponent } from './components/public/signup/signup.component';
import { WelcomeComponent } from './components/public/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { IpAddressComponent } from './components/ip-address/ip-address.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';

const routes: Routes = [
  { 
    path: '', 
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'welcome', component: WelcomeComponent },
    ] 
  },
  { 
    path: 'home', 
    component: HomeComponent
  },
  { path: 'ip-address', component: IpAddressComponent},
  { path: 'audit-log', component: AuditLogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
