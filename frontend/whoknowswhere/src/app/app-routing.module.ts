import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { RoleGuard } from './guards/role.guard';
import { environment } from 'src/environments/environment';


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
