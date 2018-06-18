import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { ViewrideComponent} from './viewride/viewride.component';
import { SettingsComponent} from './settings/settings.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'register',  component: RegisterComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'viewride/:id',  component: ViewrideComponent },
    { path: 'settings',  component: SettingsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}