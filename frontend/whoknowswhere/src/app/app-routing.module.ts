import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { RoleGuard } from './guards/role.guard';
import { environment } from 'src/environments/environment';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CreateDestinationComponent } from './components/admin-panel/create-destination/create-destination.component';
import { CreatePoiComponent } from './components/admin-panel/create-poi/create-poi.component';
import { ViewDestinationsComponent } from './components/admin-panel/view-destinations/view-destinations.component';
import { ViewPoiComponent } from './components/admin-panel/view-poi/view-poi.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'admin-panel',
    component : AdminPanelComponent,
    canActivate: [RoleGuard],
    data: {permissions: [environment.roles.ADMIN]},
    children: [
      { 
        path: 'create-destination', 
        component: CreateDestinationComponent
      },
      { 
        path: 'create-poi', 
        component: CreatePoiComponent
      },
      { 
        path: 'view-destinations', 
        component: ViewDestinationsComponent
      },
      { 
        path: 'view-poi', 
        component: ViewPoiComponent
      },
    ]
  },
  {
    path : 'destinations',
    component : DestinationsComponent,
    canActivate: [RoleGuard],
    data: {permissions: [environment.roles.REGISTERED_USER]}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
