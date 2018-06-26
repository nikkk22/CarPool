import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { ViewrideComponent} from './viewride/viewride.component';
import { SettingsComponent} from './settings/settings.component';
import { CreaterideComponent} from './createride/createride.component';
import { OfferedRidesComponent} from './offered-rides/offered-rides.component';
import { HistoryComponent} from './history/history.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'register',  component: RegisterComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'viewride/:id',  component: ViewrideComponent },
    { path: 'settings',  component: SettingsComponent },
    { path: 'createride',  component: CreaterideComponent },
    { path: 'offeredRides',  component: OfferedRidesComponent },
    { path: 'history',  component: HistoryComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}