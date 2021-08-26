import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LocationMaterielComponent } from './location-materiel/location-materiel.component';
import { LocationMaterielListComponent } from './location-materiel-list/location-materiel-list.component';


const routes: Routes = [
  { path: 'faire-demande', component: LocationMaterielComponent },
  { path: 'mes-demandes', component: LocationMaterielListComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
