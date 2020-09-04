import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { EarthComponent } from './components/earth/earth.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { AgmCoreModule } from '@agm/core';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SelectedDestinationComponent } from './components/selected-destination/selected-destination.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ViewDestinationsComponent } from './components/admin-panel/view-destinations/view-destinations.component';
import { ViewPoiComponent } from './components/admin-panel/view-poi/view-poi.component';
import { CreateDestinationComponent } from './components/admin-panel/create-destination/create-destination.component';
import { CreatePoiComponent } from './components/admin-panel/create-poi/create-poi.component';
import { AdminMapComponent } from './components/admin-map/admin-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialogComponent,
    EarthComponent,
    DestinationsComponent,
    RegisterDialogComponent,
    SelectedDestinationComponent,
    AdminPanelComponent,
    ViewDestinationsComponent,
    ViewPoiComponent,
    CreateDestinationComponent,
    CreatePoiComponent,
    AdminMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABNvl4H4aM9ToVwM9ogm4qedE8Zq4QOuU'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
