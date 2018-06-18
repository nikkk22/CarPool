import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService} from '../services/user.service';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';      
import { AgmDirectionModule } from 'agm-direction';
import { ViewrideComponent } from './viewride/viewride.component'; 
import { MapGeoCodeService } from '../services/map.geocode.service';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { SettingsComponent } from './settings/settings.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ViewrideComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyD-vPzHf3NIhZw6AiPZHPm9ysRxueryaSc',
    }),
    AgmDirectionModule,
    Ng4GeoautocompleteModule.forRoot(),
    Ng2SearchPipeModule,
    Ng2OrderModule
  ],
  providers: [UserService,MapGeoCodeService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
